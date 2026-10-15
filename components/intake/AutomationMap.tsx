import { ArrowRight } from "lucide-react";
import { buildMap } from "@/lib/intake/logic";
import type { Answers, MapTag } from "@/lib/intake/types";

function Tags({ tags, empty }: { tags: MapTag[]; empty?: string }) {
  if (tags.length === 0) return empty ? <p className="am-none">{empty}</p> : null;
  return (
    <ul className="am-tags">
      {tags.map((t) => (
        <li key={t.label} className={`am-tag am-${t.level}`}>
          {t.label}
          <small>{t.level === "high" ? "High priority" : "Later"}</small>
        </li>
      ))}
    </ul>
  );
}

export function AutomationMap({ answers }: { answers: Answers }) {
  const map = buildMap(answers);
  return (
    <section className="am" aria-labelledby="am-title">
      <h3 id="am-title">Niramayam Automation Map</h3>
      <p className="am-lead">
        Your patient journey, with the areas you chose placed where they would help. This is a first sketch built from your answers, not a final design.
      </p>
      {!map.hasPriorities ? <p className="am-none">You have not chosen any priorities yet. Go back to “Desired automation” to see them on the map.</p> : null}

      <ol className="am-flow" aria-label="Patient journey">
        {map.steps.map((s, i) => (
          <li key={s.name}>
            <div className="am-node">
              <span className="am-n">{i + 1}</span>
              <strong>{s.name}</strong>
              <Tags tags={s.tags} />
            </div>
            {i < map.steps.length - 1 ? <ArrowRight className="am-arrow" size={16} aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>

      {map.across.length > 0 ? (
        <div className="am-across">
          <h4>Across the whole journey</h4>
          <Tags tags={map.across} />
        </div>
      ) : null}

      <div className="am-lanes">
        {map.lanes.map((l) => (
          <div key={l.id} className="am-lane">
            <h4>{l.title}</h4>
            <Tags tags={l.items} empty="Nothing chosen yet" />
          </div>
        ))}
      </div>
    </section>
  );
}
