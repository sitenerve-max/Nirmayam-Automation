import { DiscoveryCta } from "@/components/DiscoveryCta";
import { Note, PageHeader, Section } from "@/components/ui";
import { discoveryQuestions, phases } from "@/lib/sample";

export const metadata = { title: "Roadmap — Niramayam Care OS" };

export default function Roadmap() {
  return (
    <>
      <PageHeader
        eyebrow="Implementation roadmap"
        title="Four phases, built in the order that helps most."
        lead="A proposed sequence. The real order depends on what Niramayam finds most painful today."
      />
      <Note>Phases are a proposal, not a commitment. Scope, timeline and quotation are prepared after the discovery discussion.</Note>

      <Section title="Implementation phases">
        <div className="phases">
          {phases.map((p) => (
            <article className="card phase" key={p.tag}>
              <p className="eyebrow">{p.tag}</p>
              <h3>{p.name}</h3>
              <ul className="ticks">
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Questions to confirm in the discovery meeting" lead="Answers to these shape the final module plan.">
        <ol className="questions">
          {discoveryQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </Section>

      <DiscoveryCta />
    </>
  );
}
