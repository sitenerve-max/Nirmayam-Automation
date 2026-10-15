"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, RotateCcw } from "lucide-react";
import { scenarios, type Scenario } from "@/lib/story";

type LogEntry = { id: number; time: string; label: string; result: string };

const RUN_MS = 600;

export function ScenarioSimulator() {
  const [active, setActive] = useState<Scenario | null>(null);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(1);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function run(s: Scenario) {
    if (timer.current) clearTimeout(timer.current);
    setActive(s);
    setRunning(true);
    timer.current = setTimeout(() => {
      setRunning(false);
      const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLog((l) => [{ id: nextId.current++, time, label: s.label, result: s.result }, ...l]);
    }, RUN_MS);
  }

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setActive(null);
    setRunning(false);
    setLog([]);
  }

  return (
    <div className="sim">
      <div className="sim-bar">
        <p className="muted">Try a sample event — this does not send messages or create real records.</p>
        <button type="button" className="btn btn-ghost" onClick={reset} disabled={!active && log.length === 0}>
          <RotateCcw size={14} aria-hidden="true" /> Reset
        </button>
      </div>

      <div className="scn-grid">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`scn${active?.id === s.id ? " is-on" : ""}`}
            aria-pressed={active?.id === s.id}
            disabled={running}
            onClick={() => run(s)}
          >
            <strong>{s.label}</strong>
            <span>{s.blurb}</span>
          </button>
        ))}
      </div>

      <div className="card result" role="status" aria-live="polite">
        {!active ? (
          <p className="empty">Choose an event above to see what the system does and what a person still has to do.</p>
        ) : (
          <>
            <div className="ba">
              <span className="ba-before"><small>Before</small>{active.before}</span>
              <ArrowRight size={18} aria-hidden="true" />
              <span className="ba-after">
                <small>After</small>
                {running ? <Loader2 className="spin" size={16} aria-label="Working" /> : <span className="ba-val"><Check size={16} aria-hidden="true" /> {active.after}</span>}
              </span>
            </div>
            {running ? (
              <p className="running">Running “{active.label}”…</p>
            ) : (
              <dl className="panels">
                <div><dt>Trigger</dt><dd>{active.trigger}</dd></div>
                <div className="p-system"><dt>System action</dt><dd>{active.system}</dd></div>
                <div className="p-human"><dt>Human action</dt><dd>{active.human}</dd></div>
                <div><dt>Next result</dt><dd>{active.result}</dd></div>
              </dl>
            )}
          </>
        )}
      </div>

      {log.length > 0 ? (
        <div className="card">
          <h3>Sample activity</h3>
          <ol className="timeline">
            {log.map((e) => (
              <li key={e.id}>
                <time>{e.time}</time>
                <strong>{e.label}</strong>
                <span>{e.result}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
