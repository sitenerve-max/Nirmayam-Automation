import Link from "next/link";
import { FlowPlayground } from "@/components/FlowPlayground";
import { Note, PageHeader, Section } from "@/components/ui";
import { stages } from "@/lib/flow";

export const metadata = { title: "Workflow — Niramayam Care OS" };

const links = [
  { from: "Patient flow", to: "Finance", text: "Package and session payments update collections and pending balances without re-entry." },
  { from: "Session tracking", to: "Inventory", text: "Consumables logged against sessions reduce stock and trigger reorder alerts." },
  { from: "Team operations", to: "Appointments", text: "Check-ins, shifts and approved leave decide which therapists can take bookings." },
  { from: "Every module", to: "Owner report", text: "Collections, expenses, attendance, stock and follow-ups roll up into one monthly view." },
];

export default function Workflow() {
  return (
    <>
      <PageHeader
        eyebrow="End-to-end workflow"
        title="From first enquiry to the owner’s monthly report."
        lead="Eight connected stages. Each shows what the system would do automatically and what always stays with a person."
      />

      <Section title="Interactive workflow canvas" lead="Select a stage to inspect its trigger, automated actions, human responsibility, output and status.">
        <FlowPlayground withSimulator={false} />
        <p className="muted">
          Want to see it react? <Link href="/#flow">Run the scenario simulator on the overview</Link>.
        </p>
      </Section>

      <Section title="Who does what" lead="Automation prepares and tracks. People decide and approve.">
        <div className="table-wrap">
          <table>
            <caption className="sr-only">Automated actions and human responsibilities by stage</caption>
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">Automated</th>
                <th scope="col">Stays with people</th>
                <th scope="col">Responsible</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((s) => (
                <tr key={s.id}>
                  <th scope="row">{s.name}</th>
                  <td>{s.actions.join(" · ")}</td>
                  <td>{s.human.join(" · ")}</td>
                  <td>{s.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="How the modules connect" lead="One entry feeds the other views, so the same fact is never typed twice.">
        <div className="cards-4">
          {links.map((l) => (
            <div className="card" key={l.from}>
              <p className="link-line"><strong>{l.from}</strong> → <strong>{l.to}</strong></p>
              <p>{l.text}</p>
            </div>
          ))}
        </div>
        <Note>Messages are only ever drafted for approval. No WhatsApp message or email is sent from this prototype.</Note>
      </Section>
    </>
  );
}
