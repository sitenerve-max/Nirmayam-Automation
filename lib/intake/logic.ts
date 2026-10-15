import { DEFAULT_FLOW, FLOW_QUESTION_ID, laneTitles, PRIORITY_QUESTION_ID, priorityItems, sections } from "./config";
import type { Answer, Answers, AutomationMapData, MapLane, MapTag, PriorityLevel, Question, SavedState, Section } from "./types";

export const STORAGE_KEY = "niramayam-intake-v1";
export const NOT_SURE_MESSAGE = "Please answer this question, or tick “Not sure yet”.";

export function isAnswered(q: Question, a: Answer | undefined): boolean {
  if (!a) return false;
  if (a.notSure) return true;
  switch (q.type) {
    case "text":
    case "longtext":
    case "number":
      return Boolean(a.text?.trim());
    case "choice":
    case "multichoice":
      return (a.selected ?? []).some((s) => s !== "Other") || Boolean(a.other?.trim());
    case "priorities":
      return Object.keys(a.levels ?? {}).length > 0;
    case "workflow":
      return (a.steps?.length ?? 0) > 0;
  }
}

export function validateQuestion(q: Question, a: Answer | undefined): string | null {
  if (a?.notSure) return null;
  if (q.type === "number" && a?.text?.trim() && !/^\d+$/.test(a.text.trim())) return "Please enter a whole number, for example 3.";
  if (a?.selected?.includes("Other") && !a.other?.trim()) return "Please tell us what “Other” means, or untick it.";
  if (q.required && !isAnswered(q, a)) return q.type === "priorities" ? "Please mark at least one area, or tick “Not sure yet”." : NOT_SURE_MESSAGE;
  return null;
}

export function validateSection(section: Section, answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of section.questions) {
    const message = validateQuestion(q, answers[q.id]);
    if (message) errors[q.id] = message;
  }
  return errors;
}

export function sectionStats(section: Section, answers: Answers) {
  const answered = section.questions.filter((q) => isAnswered(q, answers[q.id])).length;
  return { answered, total: section.questions.length };
}

export function getSteps(answers: Answers): string[] {
  return answers[FLOW_QUESTION_ID]?.steps ?? DEFAULT_FLOW;
}

export function formatAnswer(q: Question, a: Answer | undefined): string {
  const parts: string[] = [];
  if (q.type === "workflow") {
    parts.push((a?.steps ?? q.defaultSteps ?? []).join(" → "));
  } else if (q.type === "priorities") {
    const levels = a?.levels ?? {};
    const labelOf = (id: string) => q.items?.find((i) => i.id === id)?.label ?? id;
    const pick = (level: PriorityLevel) => Object.keys(levels).filter((id) => levels[id] === level).map(labelOf);
    const high = pick("high");
    const later = pick("later");
    if (high.length) parts.push(`High priority: ${high.join(", ")}`);
    if (later.length) parts.push(`Later: ${later.join(", ")}`);
  } else if (q.type === "choice" || q.type === "multichoice") {
    const picked = (a?.selected ?? []).filter((s) => s !== "Other");
    if (picked.length) parts.push(picked.join(", "));
    if (a?.selected?.includes("Other") && a.other?.trim()) parts.push(`Other: ${a.other.trim()}`);
  } else if (a?.text?.trim()) {
    parts.push(a.text.trim());
  }
  if (a?.notSure) parts.push("Not sure yet");
  return parts.join(" · ");
}

export function buildSummaryText(answers: Answers): string {
  const lines = ["Niramayam workflow summary (demo discovery document)", `Created: ${new Date().toLocaleDateString("en-IN")}`, ""];
  for (const s of sections) {
    const rows = s.questions.map((q) => ({ q, text: formatAnswer(q, answers[q.id]) })).filter((r) => r.text);
    if (rows.length === 0) continue;
    lines.push(s.title.toUpperCase());
    for (const r of rows) lines.push(`- ${r.q.label}\n  ${r.text}`);
    lines.push("");
  }
  lines.push("This is an initial discovery document. Final scope, timeline and pricing follow a requirement discussion.");
  return lines.join("\n");
}

export function buildExport(answers: Answers) {
  return {
    tool: "Niramayam workflow discovery (demo)",
    notice: "Created in the browser. Nothing was sent anywhere. This is an initial discovery document, not a quotation.",
    generatedAt: new Date().toISOString(),
    sections: sections.map((s) => ({
      id: s.id,
      title: s.title,
      answers: s.questions.map((q) => ({
        id: q.id,
        question: q.label,
        answer: formatAnswer(q, answers[q.id]),
        notSure: Boolean(answers[q.id]?.notSure),
      })),
    })),
    raw: answers,
  };
}

export function buildMap(answers: Answers): AutomationMapData {
  const levels = answers[PRIORITY_QUESTION_ID]?.levels ?? {};
  const stepNames = getSteps(answers);
  const steps = stepNames.map((name) => ({ name, tags: [] as MapTag[] }));
  const across: MapTag[] = [];
  const laneItems: Record<MapLane, MapTag[]> = { patient: [], team: [], inventory: [], finance: [], owner: [] };

  for (const item of priorityItems) {
    const level = levels[item.id];
    if (!level) continue;
    const tag: MapTag = { label: item.label, level };
    if (item.lane === "patient") {
      const keywords = (item.stepMatch ?? "").split("|").filter(Boolean);
      let target: (typeof steps)[number] | undefined;
      for (const keyword of keywords) {
        target = steps.find((s) => s.name.toLowerCase().includes(keyword));
        if (target) break;
      }
      if (target) target.tags.push(tag);
      else across.push(tag);
    } else {
      laneItems[item.lane].push(tag);
    }
  }

  const lanes = (["team", "inventory", "finance", "owner"] as const).map((id) => ({ id, title: laneTitles[id], items: laneItems[id] }));
  return { steps, across, lanes, hasPriorities: Object.keys(levels).length > 0 };
}

export function loadState(): SavedState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    if (parsed.version !== 1 || typeof parsed.answers !== "object" || parsed.answers === null) return null;
    return { version: 1, answers: parsed.answers, step: typeof parsed.step === "number" ? parsed.step : 0, updatedAt: String(parsed.updatedAt ?? "") };
  } catch {
    return null;
  }
}

export function saveState(state: SavedState): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable: nothing to clear */
  }
}
