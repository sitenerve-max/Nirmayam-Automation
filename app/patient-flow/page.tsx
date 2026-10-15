import { ApprovalList } from "@/components/ApprovalList";
import { Badge, Note, PageHeader, Section } from "@/components/ui";
import { enquirySources, followUpQueues, patientSteps } from "@/lib/sample";

export const metadata = { title: "Patient flow — Niramayam Care OS" };

export default function PatientFlow() {
  return (
    <>
      <PageHeader
        eyebrow="Module 1 · Patient flow"
        title="One path from enquiry to progress review."
        lead="Every enquiry becomes a tracked journey with a clear owner and next action at each step."
      />
      <Note tone="warn">
        <strong>Clinical boundary.</strong> This module does not diagnose, suggest treatment or generate medical recommendations. Clinical decisions remain with
        qualified physiotherapists.
      </Note>

      <Section title="Enquiry sources" lead="All channels land in one queue instead of separate chats and notebooks.">
        <ul className="pill-row">
          {enquirySources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="The patient journey" lead="Thirteen steps, each with a responsible role. Sample process — to be confirmed with Niramayam.">
        <ol className="steps">
          {patientSteps.map((s, i) => (
            <li key={s.title}>
              <span className="step-num">{i + 1}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.detail}</p>
              </div>
              <Badge tone="info">{s.role}</Badge>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="What is automated and what is not">
        <div className="cards-2">
          <div className="card">
            <h3>Automated by the system</h3>
            <ul className="ticks">
              <li>Creating records and assigning owners</li>
              <li>Suggesting open slots</li>
              <li>Drafting reminders and follow-up messages</li>
              <li>Tracking attendance, packages and milestones</li>
            </ul>
          </div>
          <div className="card">
            <h3>Stays with people</h3>
            <ul className="ticks muted-ticks">
              <li>All clinical assessment and treatment decisions</li>
              <li>Confirming therapist assignment</li>
              <li>Approving every message before sending</li>
              <li>Receiving payments and approving refunds</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="follow-up" title="Follow-up and retention" lead="Queues the clinic would work through each day. Each message waits for approval.">
        <ApprovalList
          label="Message approval queue (sample)"
          items={followUpQueues}
          pendingLabel="Needs approval"
          approvedLabel="Approved for sending"
          approveButton="Approve message"
          kicker="Message ready for approval"
          footnote="Prototype only: approving changes this label in your browser. No WhatsApp message or email is sent."
        />
      </Section>
    </>
  );
}
