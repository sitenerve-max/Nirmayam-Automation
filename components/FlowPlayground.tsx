"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, RotateCcw } from "lucide-react";
import { scenarios, stages, type Scenario } from "@/lib/flow";

type TimelineEvent = { id: number; time: string; label: string; role: string; message: string };

const RUN_MS = 700;

export function FlowPlayground({ withSimulator = true }: { withSimulator?: boolean }) {
  const [selectedId, setSelectedId] = useState(stages[0].id);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [active, setActive] = useState<Scenario | null>(null);
  const [running, setRunning] = useState(false);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(1);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const stage = stages.find((s) => s.id === selectedId) ?? stages[0];
  const statusOf = (id: string, fallback: string) => overrides[id] ?? fallback;

  function run(s: Scenario) {
    if (timer.current) clearTimeout(timer.current);
    setActive(s);
    setRunning(true);
    setSelectedId(s.stageId);
    timer.current = setTimeout(() => {
      setRunning(false);
      setOverrides((o) => ({ ...o, [s.stageId]: s.stageStatus }));
      const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setEvents((e) => [{ id: nextId.current++, time, label: s.label, role: s.role, message: s.message }, ...e]);
    }, RUN_MS);
  }

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setActive(null);
    setRunning(false);
    setOverrides({});
    setEvents([]);
  }

  return (
    <div className="playground">
      <div className="card canvas" aria-label="Automation workflow canvas">
        <ol className="flow">
          {stages.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={`node${s.id === selectedId ? " is-selected" : ""}${active?.stageId === s.id ? " is-hot" : ""}`}
                aria-pressed={s.id === selectedId}
                aria-controls="stage-detail"
                onClick={() => setSelectedId(s.id)}
              >
                <span className="node-num">{i + 1}</span>
                <span className="node-name">{s.name}</span>
                <span className="node-status">{statusOf(s.id, s.status)}</span>
              </button>
              {i < stages.length - 1 ? <ArrowRight className="flow-arrow" size={16} aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>

        <div id="stage-detail" className="detail" aria-live="polite">
          <div className="detail-title">
            <h3>{stage.name}</h3>
            <span className="badge badge-info">{statusOf(stage.id, stage.status)}</span>
          </div>
          <dl>
            <div>
              <dt>Trigger</dt>
              <dd>{stage.trigger}</dd>
            </div>
            <div>
              <dt>Automated actions</dt>
              <dd>
                <ul>{stage.actions.map((a) => <li key={a}>{a}</li>)}</ul>
              </dd>
            </div>
            <div>
              <dt>Human responsibility</dt>
              <dd>
                <ul>{stage.human.map((a) => <li key={a}>{a}</li>)}</ul>
              </dd>
            </div>
            <div>
              <dt>Responsible person</dt>
              <dd>{stage.owner}</dd>
            </div>
            <div>
              <dt>Output</dt>
              <dd>{stage.output}</dd>
            </div>
          </dl>
        </div>
      </div>

      {withSimulator ? (
        <div className="sim-grid">
          <div className="card">
            <div className="card-head">
              <h3>Scenario simulator</h3>
              <button type="button" className="btn btn-ghost" onClick={reset} disabled={!active && events.length === 0}>
                <RotateCcw size={14} aria-hidden="true" /> Reset
              </button>
            </div>
            <p className="muted">Run a sample event. Everything happens in your browser — no messages, orders or records are created.</p>
            <div className="chips">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`chip${active?.id === s.id ? " is-on" : ""}`}
                  aria-pressed={active?.id === s.id}
                  disabled={running}
                  onClick={() => run(s)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="result" role="status" aria-live="polite">
              {!active ? (
                <p className="empty">Choose a scenario to see its trigger, automated steps, responsible role and next action.</p>
              ) : running ? (
                <p className="running">
                  <Loader2 className="spin" size={16} aria-hidden="true" /> Running automation steps for “{active.label}”…
                </p>
              ) : (
                <>
                  <p className="success">
                    <Check size={16} aria-hidden="true" /> {active.message}
                  </p>
                  <dl className="mini">
                    <div>
                      <dt>Trigger</dt>
                      <dd>{active.trigger}</dd>
                    </div>
                    <div>
                      <dt>Automated steps</dt>
                      <dd>
                        <ol>{active.steps.map((x) => <li key={x}>{x}</li>)}</ol>
                      </dd>
                    </div>
                    <div>
                      <dt>Responsible role</dt>
                      <dd>{active.role}</dd>
                    </div>
                    <div>
                      <dt>Next action</dt>
                      <dd>{active.nextAction}</dd>
                    </div>
                  </dl>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <h3>Activity timeline</h3>
            {events.length === 0 ? (
              <p className="empty">No activity yet. Events from the simulator appear here.</p>
            ) : (
              <ol className="timeline">
                {events.map((e) => (
                  <li key={e.id}>
                    <time>{e.time}</time>
                    <strong>{e.label}</strong>
                    <span>{e.role} · {e.message}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
