"use client";

import { useState } from "react";
import { ArrowRight, BellRing, ChevronDown, ChevronUp, HeartPulse, MessageSquare, Settings2, type LucideIcon } from "lucide-react";
import { FlowPlayground } from "@/components/FlowPlayground";
import { journeySteps } from "@/lib/story";

const icons: Record<string, LucideIcon> = {
  enquiry: MessageSquare,
  care: HeartPulse,
  operations: Settings2,
  followup: BellRing,
};

export function JourneyOverview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="journey-wrap">
      <ol className="journey">
        {journeySteps.map((s, i) => {
          const Icon = icons[s.key];
          return (
            <li key={s.key}>
              <div className="jstep">
                <span className="jnum">{i + 1}</span>
                <Icon size={22} aria-hidden="true" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              {i < journeySteps.length - 1 ? <ArrowRight className="jarrow" size={18} aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
      <button type="button" className="btn btn-ghost" aria-expanded={open} aria-controls="detailed-workflow" onClick={() => setOpen((v) => !v)}>
        {open ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
        {open ? "Hide detailed workflow" : "Show detailed workflow"}
      </button>
      <div id="detailed-workflow" hidden={!open}>
        {open ? <FlowPlayground /> : null}
      </div>
    </div>
  );
}
