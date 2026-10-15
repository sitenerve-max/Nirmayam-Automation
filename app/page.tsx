import Link from "next/link";
import { ArrowRight, Boxes, HeartPulse, Repeat, Users, Wallet } from "lucide-react";
import { DiscoveryCta } from "@/components/DiscoveryCta";
import { FlowPlayground } from "@/components/FlowPlayground";
import { Note, SampleTag, Section } from "@/components/ui";

const summary = [
  { href: "/patient-flow", icon: HeartPulse, title: "Patient workflow", text: "Enquiry to appointment, assessment task, session tracking and package status in one record.", stat: "13 steps mapped" },
  { href: "/team-operations", icon: Users, title: "Team attendance and salary", text: "Check-ins, shifts, leave approvals and payroll inputs ready for month end.", stat: "5 roles" },
  { href: "/inventory", icon: Boxes, title: "Inventory and equipment", text: "Stock levels, reorder alerts and purchase requests with an approval step.", stat: "6 sample items" },
  { href: "/finance", icon: Wallet, title: "Expenses and profit", text: "Collections, expenses and an estimated operating profit the owner can read at a glance.", stat: "Prototype estimate" },
  { href: "/patient-flow#follow-up", icon: Repeat, title: "Follow-up and retention", text: "Missed-visit and review messages prepared for approval — never sent automatically.", stat: "5 queues" },
];

const connected = ["Patient flow", "Team operations", "Inventory", "Expenses & finance", "Follow-up"];

export default function Overview() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">NIRAMAYAM CARE OS · Business Automation Blueprint by SiteNerve</p>
          <h1>How Niramayam can run with less manual work.</h1>
          <p className="lead">A proposed automation map for patient care, people operations, inventory, finance and follow-up.</p>
          <div className="actions">
            <a className="btn btn-primary btn-lg" href="#flow">
              Explore the automation flow <ArrowRight size={16} aria-hidden="true" />
            </a>
            <Link className="btn btn-outline btn-lg" href="/roadmap#discovery">
              Prepare for 15-minute discovery meeting
            </Link>
          </div>
          <p className="hero-note">This is a concept proposal, not a final quotation or production system.</p>
        </div>
        <div className="hero-map" aria-label="Connected modules">
          <p className="hero-map-title">One organised system</p>
          <ul>
            {connected.map((c) => (
              <li key={c}>
                <span className="dot" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="hero-map-foot">SiteNerve can connect Niramayam’s patient flow, staff operations, inventory, expenses, finance and follow-ups into one organised system.</p>
        </div>
      </section>

      <Section title="Five areas, one connected view" lead="Each card opens a sample module. All figures are fictional.">
        <div className="cards-5">
          {summary.map(({ href, icon: Icon, title, text, stat }) => (
            <Link key={title} href={href} className="card summary">
              <span className="icon-wrap"><Icon size={20} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="summary-foot"><SampleTag>{stat}</SampleTag><ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="flow" title="Automation flow" lead="Select a stage to see what is automated and what stays with people. Run a scenario to watch the flow react.">
        <FlowPlayground />
        <Note>Clinical decisions remain with qualified physiotherapists. The system never diagnoses or recommends treatment.</Note>
      </Section>

      <DiscoveryCta />
    </>
  );
}
