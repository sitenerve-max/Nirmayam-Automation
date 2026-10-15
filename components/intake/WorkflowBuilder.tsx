"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Plus, RotateCcw, X } from "lucide-react";

type Props = {
  id: string;
  steps: string[];
  defaults: string[];
  suggestions: string[];
  onChange: (steps: string[]) => void;
};

const norm = (s: string) => s.trim().toLowerCase();

export function WorkflowBuilder({ id, steps, defaults, suggestions, onChange }: Props) {
  const [draft, setDraft] = useState("");
  const [message, setMessage] = useState("");

  const has = (name: string) => steps.some((s) => norm(s) === norm(name));

  function add(name: string) {
    const clean = name.trim();
    if (!clean) {
      setMessage("Type a step name first, for example “Referral”.");
      return;
    }
    if (has(clean)) {
      setMessage(`“${clean}” is already in your flow.`);
      return;
    }
    onChange([...steps, clean]);
    setMessage(`Added “${clean}”.`);
    setDraft("");
  }

  function move(index: number, by: -1 | 1) {
    const target = index + by;
    if (target < 0 || target >= steps.length) return;
    const next = [...steps];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setMessage(`Moved “${steps[index]}” to position ${target + 1} of ${steps.length}.`);
  }

  function remove(index: number) {
    setMessage(`Removed “${steps[index]}”.`);
    onChange(steps.filter((_, i) => i !== index));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    add(draft);
  }

  const unused = suggestions.filter((s) => !has(s));

  return (
    <div className="wb" id={id} tabIndex={-1}>
      {steps.length === 0 ? (
        <p className="wb-empty">Your flow is empty. Add a step below, or restore the suggested flow.</p>
      ) : (
        <ol className="wb-flow" aria-label="Your patient journey, in order">
          {steps.map((s, i) => (
            <li key={s}>
              <div className="wb-step">
                <span className="wb-num">{i + 1}</span>
                <span className="wb-name">{s}</span>
                <span className="wb-tools">
                  <button type="button" aria-label={`Move ${s} earlier`} disabled={i === 0} onClick={() => move(i, -1)}>
                    <ArrowLeft size={14} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label={`Move ${s} later`} disabled={i === steps.length - 1} onClick={() => move(i, 1)}>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label={`Remove ${s}`} onClick={() => remove(i)}>
                    <X size={14} aria-hidden="true" />
                  </button>
                </span>
              </div>
              {i < steps.length - 1 ? <ArrowRight className="wb-arrow" size={16} aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
      )}

      <form className="wb-add" onSubmit={submit}>
        <label htmlFor={`${id}-new`} className="sr-only">New step name</label>
        <input id={`${id}-new`} type="text" value={draft} placeholder="Add your own step, for example Referral" onChange={(e) => setDraft(e.target.value)} />
        <button type="submit" className="btn btn-ghost">
          <Plus size={14} aria-hidden="true" /> Add step
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => { onChange(defaults); setMessage("Restored the suggested flow."); }}>
          <RotateCcw size={14} aria-hidden="true" /> Restore suggested flow
        </button>
      </form>

      {unused.length > 0 ? (
        <p className="wb-suggest">
          <span>Ideas:</span>
          {unused.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => add(s)}>
              + {s}
            </button>
          ))}
        </p>
      ) : null}
      <p className="wb-status" role="status" aria-live="polite">{message}</p>
    </div>
  );
}
