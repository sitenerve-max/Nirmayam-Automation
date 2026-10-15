import { Note, PageHeader, SampleTag, Section } from "@/components/ui";
import { expenseLines, incomeLines, inr, pendingPayments, refunds, reportItems, weeklyCollections } from "@/lib/sample";

export const metadata = { title: "Finance — Niramayam Physio" };

const sum = (xs: { amount: number }[]) => xs.reduce((t, x) => t + x.amount, 0);

export default function Finance() {
  const collected = sum(incomeLines);
  const expenses = sum(expenseLines);
  const profit = collected - refunds - expenses;
  const maxWeek = Math.max(...weeklyCollections.map((w) => w.amount));

  return (
    <>
      <PageHeader
        eyebrow="Collections, expenses and profit"
        title="See what came in, what went out and what is left."
        lead="Payments recorded at the front desk and expenses entered by admin add up to a simple monthly view for the owner."
      />
      <Note tone="warn">
        <strong>Fictional figures.</strong> Every amount on this page is made up to show the layout. None of it is Niramayam’s actual financial data.
      </Note>

      <div className="stats">
        <div className="stat"><span>Total collected this month</span><strong>{inr(collected)}</strong><SampleTag>Sample collection</SampleTag></div>
        <div className="stat"><span>Monthly expenses</span><strong>{inr(expenses)}</strong><SampleTag>Example expense</SampleTag></div>
        <div className="stat stat-key"><span>Estimated monthly profit</span><strong>{inr(profit)}</strong><SampleTag>Prototype estimate</SampleTag></div>
        <div className="stat"><span>Pending payments</span><strong>{inr(pendingPayments)}</strong><SampleTag>Sample collection</SampleTag></div>
        <div className="stat"><span>Refunds</span><strong>{inr(refunds)}</strong><SampleTag>Sample collection</SampleTag></div>
      </div>
      <p className="muted">Estimated monthly profit = total collected − refunds − monthly expenses. Prototype estimate only.</p>

      <Section title="Money collected" lead="Daily collections and package payments, with a weekly view.">
        <div className="cards-2">
          <div className="card">
            <h3>By source</h3>
            <ul className="lines">
              {incomeLines.map((l) => (
                <li key={l.label}><span>{l.label} <SampleTag>{l.tag}</SampleTag></span><b>{inr(l.amount)}</b></li>
              ))}
              <li className="total"><span>Total collected</span><b>{inr(collected)}</b></li>
            </ul>
          </div>
          <div className="card">
            <h3>Week by week <SampleTag>Sample collection</SampleTag></h3>
            <ul className="bars">
              {weeklyCollections.map((w) => (
                <li key={w.week}>
                  <span>{w.week}</span>
                  <i style={{ width: `${(w.amount / maxWeek) * 100}%` }} role="img" aria-label={`${w.week}: ${inr(w.amount)}`} />
                  <b>{inr(w.amount)}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Money spent" lead="Entered once, sorted into categories, and reflected in the profit estimate straight away.">
        <div className="card">
          <ul className="bars bars-wide">
            {expenseLines.map((e) => (
              <li key={e.label}>
                <span>{e.label} <SampleTag>{e.tag}</SampleTag></span>
                <i style={{ width: `${(e.amount / expenses) * 100}%` }} role="img" aria-label={`${e.label}: ${inr(e.amount)}`} />
                <b>{inr(e.amount)}</b>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Monthly owner report" lead="What the owner would receive at month end.">
        <div className="card">
          <ul className="ticks two-col">
            {reportItems.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
