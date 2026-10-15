"use client";

import { useState } from "react";
import { Badge } from "@/components/ui";

type Item = { id: string; title: string; detail: string; role: string };
type Decision = "pending" | "approved" | "rejected";

type Props = {
  items: Item[];
  pendingLabel: string;
  approvedLabel: string;
  rejectedLabel?: string; // enables a Reject button when set
  approveButton?: string;
  kicker?: string;
  footnote?: string;
  label: string;
};

export function ApprovalList({ items, pendingLabel, approvedLabel, rejectedLabel, approveButton = "Approve", kicker, footnote, label }: Props) {
  const [state, setState] = useState<Record<string, Decision>>({});
  const decide = (id: string, d: Decision) => setState((s) => ({ ...s, [id]: d }));
  const pendingCount = items.filter((i) => (state[i.id] ?? "pending") === "pending").length;

  return (
    <div className="card">
      <div className="card-head">
        <h3>{label}</h3>
        <span className="muted" aria-live="polite">{pendingCount} of {items.length} waiting</span>
      </div>
      <ul className="approvals">
        {items.map((i) => {
          const d = state[i.id] ?? "pending";
          return (
            <li key={i.id}>
              <div>
                <strong>{i.title}</strong>
                <span>{i.detail}</span>
                {kicker ? <em>{kicker}</em> : null}
                <small>Approver: {i.role}</small>
              </div>
              <div className="approval-actions">
                <Badge tone={d === "approved" ? "ok" : d === "rejected" ? "bad" : "warn"}>
                  {d === "approved" ? approvedLabel : d === "rejected" ? rejectedLabel : pendingLabel}
                </Badge>
                {d === "pending" ? (
                  <>
                    <button type="button" className="btn btn-primary" onClick={() => decide(i.id, "approved")}>
                      {approveButton}
                    </button>
                    {rejectedLabel ? (
                      <button type="button" className="btn btn-ghost" onClick={() => decide(i.id, "rejected")}>
                        Reject
                      </button>
                    ) : null}
                  </>
                ) : (
                  <button type="button" className="btn btn-ghost" onClick={() => decide(i.id, "pending")}>
                    Undo
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {footnote ? <p className="muted foot-note">{footnote}</p> : null}
    </div>
  );
}
