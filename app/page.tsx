import Link from "next/link";
import { ArrowRight, Boxes, CalendarClock, Check, LayoutDashboard, MessageSquare, Users, type LucideIcon } from "lucide-react";
import { DiscoveryCta } from "@/components/DiscoveryCta";
import { JourneyOverview } from "@/components/JourneyOverview";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";
import { Note, SampleTag, Section } from "@/components/ui";
import { phases } from "@/lib/sample";
import { automated, heroStory, humanControl, modules, patientStory, problems } from "@/lib/story";

const problemIcons: Record<string, LucideIcon> = {
  enquiries: MessageSquare,
  appointments: CalendarClock,
  staff: Users,
  stock: Boxes,
  owner: LayoutDashboard,
};

const [firstPhase, ...laterPhases] = phases;

export default function Overview() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">NIRAMAYAM PHYSIO × SITENERVE</p>
          <h1>Run your physiotherapy clinic with less manual follow-up.</h1>
          <p className="lead">
            SiteNerve can connect patient enquiries, appointments, staff attendance, inventory, expenses and follow-ups into one simple system.
          </p>
          <div className="actions">
            <a className="btn btn-primary btn-lg" href="#journey">
              See how the clinic workflow works <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="btn btn-outline btn-lg" href="#discovery">
              Discuss it in 15 minutes
            </a>
          </div>
          <p className="demo-badge">Concept proposal — sample data only — not a live production system.</p>
        </div>
        <dl className="hero-story">
          {heroStory.map((h) => (
            <div key={h.label}>
              <dt>{h.label}</dt>
              <dd>{h.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section id="easier" title="What can be made easier?" lead="Five everyday areas of the clinic, each with a simple before and after.">
        <div className="cards-5">
          {problems.map((p) => {
            const Icon = problemIcons[p.key];
            return (
              <article className="card problem" key={p.key}>
                <span className="icon-wrap"><Icon size={20} aria-hidden="true" /></span>
                <h3>{p.title}</h3>
                <dl>
                  <div><dt>Current problem</dt><dd>{p.problem}</dd></div>
                  <div><dt>Proposed automation</dt><dd>{p.solution}</dd></div>
                  <div><dt>Responsible person</dt><dd>{p.who}</dd></div>
                  <div><dt>Expected result</dt><dd>{p.result}</dd></div>
                </dl>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="journey" title="How the clinic workflow works" lead="Four steps from the first enquiry to follow-up.">
        <JourneyOverview />
      </Section>

      <Section
        id="patient-story"
        title="See one patient journey"
        lead="Demo data: Priya Mehta contacts Niramayam on WhatsApp about knee pain. The system organises the work. It does not suggest a diagnosis or treatment."
      >
        <ol className="story">
          {patientStory.map((s, i) => (
            <li key={s.title}>
              <span className="story-num">{i + 1}</span>
              <div className="story-body">
                <h3>{s.title}</h3>
                <p className="story-system"><b>System</b> {s.system}</p>
                <p className="story-human"><b>Person</b> {s.human}</p>
              </div>
            </li>
          ))}
        </ol>
        <SampleTag>Demo data — Priya Mehta is a fictional patient</SampleTag>
      </Section>

      <Section id="split" title="What is automated, and what stays human">
        <div className="split">
          <div className="card split-auto">
            <h3>Automated</h3>
            <ul className="ticks">
              {automated.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <div className="card split-human">
            <h3>Human control</h3>
            <ul className="ticks human-ticks">
              {humanControl.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </div>
        <Note tone="warn">Automation organises the work. Qualified physiotherapists remain responsible for clinical decisions.</Note>
      </Section>

      <Section id="try" title="Try a sample event" lead="Click an event to see what happens before and after.">
        <ScenarioSimulator />
      </Section>

      <Section id="modules" title="Explore each area">
        <div className="cards-5">
          {modules.map((m) => (
            <article className="card module" key={m.title}>
              <h3>{m.title}</h3>
              <dl>
                <div><dt>What is the current problem?</dt><dd>{m.problem}</dd></div>
                <div><dt>What will SiteNerve automate?</dt><dd>{m.automate}</dd></div>
                <div><dt>What will the owner see?</dt><dd>{m.owner}</dd></div>
              </dl>
              <Link className="btn btn-ghost" href={m.href}>Open example <ArrowRight size={14} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="start" title="We should not automate everything on day one.">
        <div className="startplan">
          <div className="card start-first">
            <p className="eyebrow">Recommended start · {firstPhase.tag}</p>
            <h3>{firstPhase.name}</h3>
            <ul className="ticks two-col">
              {firstPhase.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <p>
              This phase should be implemented first because it improves the daily patient journey without changing every internal process at once.
            </p>
          </div>
          <div className="card">
            <h3>Later phases</h3>
            <ol className="later">
              {laterPhases.map((p) => (
                <li key={p.tag}><Check size={14} aria-hidden="true" /> {p.name}</li>
              ))}
            </ol>
          </div>
        </div>
        <p className="muted">Final phase selection will be confirmed after the discovery meeting. <Link href="/roadmap">See the full implementation plan</Link>.</p>
      </Section>

      <DiscoveryCta />
    </>
  );
}
