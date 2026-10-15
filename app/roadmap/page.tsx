import { DiscoveryCta } from "@/components/DiscoveryCta";
import { Note, PageHeader, Section } from "@/components/ui";
import { discoveryQuestions, phases } from "@/lib/sample";

export const metadata = { title: "Implementation plan — Niramayam Physio" };

export default function Roadmap() {
  return (
    <>
      <PageHeader
        eyebrow="Implementation plan"
        title="Start with patient enquiries and appointments."
        lead="We should not automate everything on day one. The real order will depend on what Niramayam finds most time-consuming today."
      />
      <Note>Final phase selection will be confirmed after the discovery meeting. This is a proposal, not a final quotation.</Note>

      <Section title="Proposed phases">
        <div className="phases">
          {phases.map((p, i) => (
            <article className={`card phase${i === 0 ? " phase-first" : ""}`} key={p.tag}>
              <p className="eyebrow">{p.tag}{i === 0 ? " · Start here" : ""}</p>
              <h3>{p.name}</h3>
              <ul className="ticks">
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Questions to confirm in the discovery meeting" lead="Answers to these shape the final module list.">
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
