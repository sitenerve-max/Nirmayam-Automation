"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { stages } from "@/lib/flow";

export function FlowPlayground() {
  const [selectedId, setSelectedId] = useState(stages[0].id);
  const stage = stages.find((s) => s.id === selectedId) ?? stages[0];

  return (
    <div className="card canvas" aria-label="Detailed workflow">
      <ol className="flow">
        {stages.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={`node${s.id === selectedId ? " is-selected" : ""}`}
              aria-pressed={s.id === selectedId}
              aria-controls="stage-detail"
              onClick={() => setSelectedId(s.id)}
            >
              <span className="node-num">{i + 1}</span>
              <span className="node-name">{s.name}</span>
              <span className="node-status">{s.status}</span>
            </button>
            {i < stages.length - 1 ? <ArrowRight className="flow-arrow" size={16} aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>

      <div id="stage-detail" className="detail" aria-live="polite">
        <div className="detail-title">
          <h3>{stage.name}</h3>
          <span className="badge badge-info">Sample: {stage.status}</span>
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
            <dt>Stays with people</dt>
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
  );
}
