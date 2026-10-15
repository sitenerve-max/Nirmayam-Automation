"use client";

import { useState } from "react";
import { CalendarClock } from "lucide-react";

export function DiscoveryCta() {
  const [clicked, setClicked] = useState(false);
  return (
    <section className="cta" id="discovery" aria-labelledby="discovery-title">
      <p className="eyebrow">Step 3 · Confirm in a meeting</p>
      <h2 id="discovery-title">Let’s understand how Niramayam works today.</h2>
      <p>
        In a 15-minute Google Meet, SiteNerve will ask about your current patient, staff, inventory and finance process. After that, we will prepare a final
        module list, implementation plan and quotation.
      </p>
      <button type="button" className="btn btn-light" onClick={() => setClicked(true)}>
        <CalendarClock size={16} aria-hidden="true" /> Request a 15-minute discussion
      </button>
      <p className="cta-note" role="status" aria-live="polite">
        {clicked
          ? "Demo action only: nothing was booked and no message was sent. Please share a preferred time with SiteNerve directly."
          : "This button is only a demo action. It does not book a meeting or send a message."}
      </p>
    </section>
  );
}
