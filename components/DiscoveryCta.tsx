"use client";

import { useState } from "react";
import { CalendarClock } from "lucide-react";

export function DiscoveryCta() {
  const [clicked, setClicked] = useState(false);
  return (
    <section className="cta" id="discovery" aria-labelledby="discovery-title">
      <p className="eyebrow">Next step</p>
      <h2 id="discovery-title">Final scope comes after understanding your real workflow.</h2>
      <p>
        In a 15-minute Google Meet, SiteNerve will understand Niramayam’s current process, identify the highest-value automation opportunities and
        prepare a final module plan, timeline and quotation.
      </p>
      <button type="button" className="btn btn-light" onClick={() => setClicked(true)}>
        <CalendarClock size={16} aria-hidden="true" /> Request a 15-minute workflow discussion
      </button>
      <p className="cta-note" role="status" aria-live="polite">
        {clicked
          ? "Prototype only: no meeting is booked and no message has been sent. Share your preferred time with SiteNerve directly."
          : "This button does not book a meeting or send anything."}
      </p>
    </section>
  );
}
