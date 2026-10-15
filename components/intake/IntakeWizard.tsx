"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarClock, Check, Clipboard, Download, Printer, Save } from "lucide-react";
import { AutomationMap } from "@/components/intake/AutomationMap";
import { QuestionField } from "@/components/intake/QuestionField";
import { ReviewSummary } from "@/components/intake/ReviewSummary";
import { sections } from "@/lib/intake/config";
import { buildExport, buildSummaryText, clearState, loadState, saveState, sectionStats, validateSection } from "@/lib/intake/logic";
import type { Answer, Answers } from "@/lib/intake/types";

const TOTAL = sections.length;
const REVIEW = TOTAL;
const DONE = TOTAL + 1;
const timeLabel = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

export function IntakeWizard() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [restored, setRestored] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [storageFailed, setStorageFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [meetNote, setMeetNote] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstStep = useRef(true);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setAnswers(saved.answers);
      setStep(Math.min(Math.max(saved.step, 0), REVIEW));
      setRestored(Object.keys(saved.answers).length > 0);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || (Object.keys(answers).length === 0 && step === 0)) return;
    const t = setTimeout(() => {
      const ok = saveState({ version: 1, answers, step: Math.min(step, REVIEW), updatedAt: new Date().toISOString() });
      setStorageFailed(!ok);
      if (ok) setSavedAt(timeLabel());
    }, 400);
    return () => clearTimeout(t);
  }, [answers, step, ready]);

  useEffect(() => {
    if (firstStep.current) {
      firstStep.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step]);

  function setAnswer(id: string, update: (prev: Answer) => Answer) {
    setAnswers((a) => ({ ...a, [id]: update(a[id] ?? {}) }));
    if (errors[id]) setErrors(({ [id]: _removed, ...rest }) => rest);
  }

  function goTo(index: number) {
    setErrors({});
    setPaused(false);
    setStep(index);
  }

  function focusFirstError(errs: Record<string, string>) {
    const first = Object.keys(errs)[0];
    if (first) document.getElementById(`q-${first}`)?.focus();
  }

  function next() {
    if (step < TOTAL) {
      const errs = validateSection(sections[step], answers);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        focusFirstError(errs);
        return;
      }
    }
    goTo(step + 1);
  }

  function finish() {
    for (let i = 0; i < TOTAL; i += 1) {
      const errs = validateSection(sections[i], answers);
      if (Object.keys(errs).length > 0) {
        setStep(i);
        setErrors(errs);
        focusFirstError(errs);
        return;
      }
    }
    goTo(DONE);
  }

  function saveNow(later: boolean) {
    const ok = saveState({ version: 1, answers, step: Math.min(step, REVIEW), updatedAt: new Date().toISOString() });
    setStorageFailed(!ok);
    if (ok) setSavedAt(timeLabel());
    setPaused(later && ok);
  }

  function clearAll() {
    clearState();
    setAnswers({});
    setErrors({});
    setSavedAt(null);
    setRestored(false);
    setConfirmClear(false);
    setStep(0);
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(buildExport(answers), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `niramayam-workflow-summary-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(buildSummaryText(answers));
      setCopyStatus("Summary copied to your clipboard.");
    } catch {
      setCopyStatus("Copying was blocked by your browser. Use Print or Download instead.");
    }
  }

  const section = step < TOTAL ? sections[step] : null;
  const errorCount = Object.keys(errors).length;

  const clearControl = confirmClear ? (
    <span className="iw-confirm" role="group" aria-label="Confirm clearing answers">
      Clear every answer on this device?
      <button type="button" className="btn btn-ghost" onClick={clearAll}>Yes, clear</button>
      <button type="button" className="btn btn-ghost" onClick={() => setConfirmClear(false)}>Cancel</button>
    </span>
  ) : (
    <button type="button" className="iw-link" onClick={() => setConfirmClear(true)}>
      Clear all answers
    </button>
  );

  if (!ready) return <p className="iw-loading" role="status">Loading your questionnaire…</p>;

  return (
    <div className="iw">
      {step < DONE ? (
        <nav className="ip no-print" aria-label="Questionnaire progress">
          <p className="ip-compact">
            {step < TOTAL ? `Step ${step + 1} of ${TOTAL} — ${sections[step].title}` : "Final step — Review your answers"}
          </p>
          <div className="ip-bar" aria-hidden="true">
            <i style={{ width: `${(Math.min(step, TOTAL) / TOTAL) * 100}%` }} />
          </div>
          <ol className="ip-list">
            {sections.map((s, i) => {
              const stats = sectionStats(s, answers);
              const state = i === step ? "current" : stats.answered > 0 ? "done" : "todo";
              return (
                <li key={s.id}>
                  <button type="button" className={`ip-step ip-${state}`} aria-current={i === step ? "step" : undefined} onClick={() => goTo(i)}>
                    <span className="ip-n">{state === "done" ? <Check size={12} aria-hidden="true" /> : i + 1}</span>
                    <span className="ip-t">{s.short}</span>
                    <span className="sr-only">{state === "done" ? ", has answers" : state === "current" ? ", current step" : ""}</span>
                  </button>
                </li>
              );
            })}
            <li>
              <button type="button" className={`ip-step ip-${step === REVIEW ? "current" : "todo"}`} aria-current={step === REVIEW ? "step" : undefined} onClick={() => goTo(REVIEW)}>
                <span className="ip-n">✓</span>
                <span className="ip-t">Review</span>
              </button>
            </li>
          </ol>
        </nav>
      ) : null}

      {restored && step < DONE ? (
        <p className="iw-note no-print" role="status">
          Welcome back. We restored your saved answers from this device.{" "}
          <button type="button" className="iw-link" onClick={() => setRestored(false)}>Dismiss</button>
        </p>
      ) : null}
      {storageFailed ? (
        <p className="iw-note iw-warn" role="alert">
          Your browser is not letting us save on this device (private mode or blocked storage). Your answers will be lost if you close this tab. Use Download on the last step.
        </p>
      ) : null}

      {paused ? (
        <section className="iw-card iw-pause" aria-labelledby="pause-title">
          <h2 id="pause-title" tabIndex={-1} ref={headingRef}>Your progress is saved.</h2>
          <p>Your answers are stored in this browser on this device only. Nothing has been sent to anyone. Come back to this page any time to carry on where you stopped.</p>
          <div className="iw-actions">
            <button type="button" className="btn btn-primary" onClick={() => setPaused(false)}>Keep answering</button>
            <Link className="btn btn-ghost" href="/">Back to the overview</Link>
          </div>
        </section>
      ) : section ? (
        <section className="iw-card" aria-labelledby="step-title">
          <p className="eyebrow">Step {step + 1} of {TOTAL}</p>
          <h2 id="step-title" tabIndex={-1} ref={headingRef}>{section.title}</h2>
          <p className="iw-intro">{section.intro}</p>
          {errorCount > 0 ? (
            <p className="iw-note iw-warn" role="alert">
              {errorCount === 1 ? "One answer needs attention below." : `${errorCount} answers need attention below.`}
            </p>
          ) : null}
          <div className="iw-questions">
            {section.questions.map((q) => (
              <QuestionField key={q.id} q={q} answer={answers[q.id]} error={errors[q.id]} onChange={(update) => setAnswer(q.id, update)} />
            ))}
          </div>
          <div className="iw-actions">
            <button type="button" className="btn btn-ghost" disabled={step === 0} onClick={() => goTo(step - 1)}>
              <ArrowLeft size={14} aria-hidden="true" /> Back
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => saveNow(false)}>
              <Save size={14} aria-hidden="true" /> Save progress
            </button>
            <button type="button" className="btn btn-primary" onClick={next}>
              {step === TOTAL - 1 ? "Review my answers" : "Continue"} <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
          <p className="iw-save" role="status" aria-live="polite">
            {savedAt ? `Saved on this device at ${savedAt}. ` : "Your answers save automatically on this device. "}
            <button type="button" className="iw-link" onClick={() => saveNow(true)}>Save and continue later</button>
          </p>
        </section>
      ) : step === REVIEW ? (
        <section className="iw-card" aria-labelledby="review-title">
          <p className="eyebrow">Final step</p>
          <h2 id="review-title" tabIndex={-1} ref={headingRef}>Review your answers</h2>
          <p className="iw-intro">Check everything below. Use Edit to change a section. Unanswered questions are fine. We will talk them through together.</p>
          <ReviewSummary answers={answers} onEdit={goTo} />
          <div className="iw-actions">
            <button type="button" className="btn btn-ghost" onClick={() => goTo(TOTAL - 1)}>
              <ArrowLeft size={14} aria-hidden="true" /> Back
            </button>
            <button type="button" className="btn btn-primary" onClick={finish}>
              Create my workflow map <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
          <p className="iw-save">{clearControl}</p>
        </section>
      ) : (
        <section className="iw-done" aria-labelledby="done-title">
          <p className="eyebrow">Discovery document</p>
          <h2 id="done-title" tabIndex={-1} ref={headingRef}>Your workflow map is ready.</h2>
          <p className="iw-lead">
            Thank you. We will study your current operations and use this information to prepare a practical automation proposal for Niramayam.
          </p>
          <p className="iw-honest">
            Nothing has been sent yet. This tool works only in your browser. Download or print your summary and share it with SiteNerve, or bring it to the meeting.
          </p>

          <div className="iw-actions no-print">
            <button type="button" className="btn btn-primary" onClick={() => setMeetNote(true)}>
              <CalendarClock size={16} aria-hidden="true" /> Schedule a 15-minute Google Meet
            </button>
            <button type="button" className="btn btn-ghost" onClick={downloadJson}>
              <Download size={16} aria-hidden="true" /> Download My Workflow Summary
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
              <Printer size={16} aria-hidden="true" /> Print or save as PDF
            </button>
            <button type="button" className="btn btn-ghost" onClick={copySummary}>
              <Clipboard size={16} aria-hidden="true" /> Copy summary
            </button>
          </div>
          <p className="iw-save no-print" role="status" aria-live="polite">
            {meetNote ? "Booking is not connected in this demo, so no meeting has been scheduled. Please share a preferred time with SiteNerve directly. " : ""}
            {copyStatus}
          </p>

          <AutomationMap answers={answers} />

          <details className="iw-details" open>
            <summary>Your answers in full</summary>
            <ReviewSummary answers={answers} />
          </details>

          <p className="iw-note">
            This is an initial discovery document. The final automation scope, timeline and pricing will be prepared after a requirement discussion.
          </p>
          <div className="iw-actions no-print">
            <button type="button" className="btn btn-ghost" onClick={() => goTo(REVIEW)}>
              <ArrowLeft size={14} aria-hidden="true" /> Edit my answers
            </button>
            {clearControl}
          </div>
        </section>
      )}
    </div>
  );
}
