"use client";

import { WorkflowBuilder } from "@/components/intake/WorkflowBuilder";
import type { Answer, PriorityLevel, Question } from "@/lib/intake/types";

type Props = {
  q: Question;
  answer: Answer | undefined;
  error?: string;
  /** Receives an updater so rapid clicks never overwrite each other with stale state. */
  onChange: (update: (prev: Answer) => Answer) => void;
};

const LEVELS: { value: PriorityLevel | "skip"; label: string }[] = [
  { value: "skip", label: "Skip" },
  { value: "later", label: "Later" },
  { value: "high", label: "High priority" },
];

export function QuestionField({ q, answer, error, onChange }: Props) {
  const a: Answer = answer ?? {};
  const id = `q-${q.id}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasHint = Boolean(q.help || q.example);
  const describedBy = [hasHint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  const set = (patch: Partial<Answer>) => onChange((prev) => ({ ...prev, ...patch }));
  const selected = a.selected ?? [];

  const hint = hasHint ? (
    <p className="q-hint" id={hintId}>
      {q.help}
      {q.help && q.example ? " " : null}
      {q.example ? <span className="q-example">Example: {q.example}</span> : null}
    </p>
  ) : null;
  const errorNode = error ? (
    <p className="q-error" id={errorId} role="alert">
      {error}
    </p>
  ) : null;

  const notSure =
    q.allowNotSure === false ? null : (
      <label className="q-notsure">
        <input type="checkbox" checked={Boolean(a.notSure)} onChange={(e) => set({ notSure: e.target.checked })} />
        Not sure yet
      </label>
    );

  function toggle(option: string) {
    if (q.type === "choice") {
      set({ selected: [option] });
      return;
    }
    onChange((prev) => {
      const current = prev.selected ?? [];
      return { ...prev, selected: current.includes(option) ? current.filter((s) => s !== option) : [...current, option] };
    });
  }

  function setLevel(itemId: string, value: PriorityLevel | "skip") {
    onChange((prev) => {
      const levels = { ...(prev.levels ?? {}) };
      if (value === "skip") delete levels[itemId];
      else levels[itemId] = value;
      return { ...prev, levels };
    });
  }

  if (q.type === "text" || q.type === "number") {
    return (
      <div className={`q${error ? " has-error" : ""}`}>
        <label className="q-label" htmlFor={id}>
          {q.label}
          {q.required ? <span className="q-req"> (required)</span> : null}
        </label>
        {hint}
        <input
          id={id}
          type="text"
          inputMode={q.type === "number" ? "numeric" : undefined}
          value={a.text ?? ""}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required={q.required || undefined}
          onChange={(e) => set({ text: e.target.value })}
        />
        {errorNode}
        {notSure}
      </div>
    );
  }

  if (q.type === "longtext") {
    return (
      <div className={`q${error ? " has-error" : ""}`}>
        <label className="q-label" htmlFor={id}>
          {q.label}
          {q.required ? <span className="q-req"> (required)</span> : null}
        </label>
        {hint}
        <textarea
          id={id}
          rows={q.rows ?? 3}
          value={a.text ?? ""}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required={q.required || undefined}
          onChange={(e) => set({ text: e.target.value })}
        />
        {errorNode}
        {notSure}
      </div>
    );
  }

  if (q.type === "choice" || q.type === "multichoice") {
    const kind = q.type === "choice" ? "radio" : "checkbox";
    const options = q.allowOther ? [...(q.options ?? []), "Other"] : (q.options ?? []);
    return (
      <fieldset id={id} tabIndex={-1} className={`q${error ? " has-error" : ""}`} aria-describedby={describedBy}>
        <legend className="q-label">
          {q.label}
          {q.required ? <span className="q-req"> (required)</span> : null}
        </legend>
        {hint}
        <div className="q-options">
          {options.map((o) => (
            <label key={o} className={`q-opt${selected.includes(o) ? " is-on" : ""}`}>
              <input type={kind} name={id} checked={selected.includes(o)} onChange={() => toggle(o)} />
              {o}
            </label>
          ))}
        </div>
        {selected.includes("Other") ? (
          <>
            <label htmlFor={`${id}-other`} className="sr-only">Describe the other option</label>
            <input id={`${id}-other`} type="text" placeholder="Please describe" value={a.other ?? ""} onChange={(e) => set({ other: e.target.value })} />
          </>
        ) : null}
        {errorNode}
        {notSure}
      </fieldset>
    );
  }

  if (q.type === "priorities") {
    const levels = a.levels ?? {};
    return (
      <fieldset id={id} tabIndex={-1} className={`q${error ? " has-error" : ""}`} aria-describedby={describedBy}>
        <legend className="q-label">
          {q.label}
          {q.required ? <span className="q-req"> (required)</span> : null}
        </legend>
        {hint}
        <ul className="pr-list">
          {(q.items ?? []).map((item) => {
            const current = levels[item.id] ?? "skip";
            return (
              <li key={item.id} className={current === "high" ? "is-high" : current === "later" ? "is-later" : ""}>
                <span className="pr-name">{item.label}</span>
                <span className="pr-group" role="group" aria-label={`${item.label} priority`}>
                  {LEVELS.map((l) => (
                    <button key={l.value} type="button" aria-pressed={current === l.value} onClick={() => setLevel(item.id, l.value)}>
                      {l.label}
                    </button>
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
        {errorNode}
        {notSure}
      </fieldset>
    );
  }

  return (
    <div className="q">
      <p className="q-label" id={`${id}-label`}>{q.label}</p>
      {hint}
      <WorkflowBuilder
        id={id}
        steps={a.steps ?? q.defaultSteps ?? []}
        defaults={q.defaultSteps ?? []}
        suggestions={q.suggestedSteps ?? []}
        onChange={(steps) => set({ steps })}
      />
    </div>
  );
}
