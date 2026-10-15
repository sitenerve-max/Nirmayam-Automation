import { formatAnswer } from "@/lib/intake/logic";
import { sections } from "@/lib/intake/config";
import type { Answers } from "@/lib/intake/types";

type Props = {
  answers: Answers;
  onEdit?: (sectionIndex: number) => void;
};

export function ReviewSummary({ answers, onEdit }: Props) {
  return (
    <div className="rs">
      {sections.map((s, i) => (
        <section key={s.id} className="rs-section" aria-labelledby={`rs-${s.id}`}>
          <div className="rs-head">
            <h3 id={`rs-${s.id}`}>
              <span>{i + 1}</span> {s.title}
            </h3>
            {onEdit ? (
              <button type="button" className="btn btn-ghost no-print" onClick={() => onEdit(i)} aria-label={`Edit ${s.title}`}>
                Edit
              </button>
            ) : null}
          </div>
          <dl>
            {s.questions.map((q) => {
              const text = formatAnswer(q, answers[q.id]);
              return (
                <div key={q.id} className={text ? "" : "is-empty"}>
                  <dt>{q.label}</dt>
                  <dd>{text || "Not answered"}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </div>
  );
}
