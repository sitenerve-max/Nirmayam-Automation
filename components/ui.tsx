import type { ReactNode } from "react";
import type { Tone } from "@/lib/sample";

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <header className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
    </header>
  );
}

export function Section({ id, title, lead, children }: { id?: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section className="section" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="section-head">
        <h2 id={id ? `${id}-title` : undefined}>{title}</h2>
        {lead ? <p>{lead}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Badge({ tone = "info", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function SampleTag({ children = "Sample data" }: { children?: ReactNode }) {
  return <span className="sample-tag">{children}</span>;
}

export function Note({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <p className={`note note-${tone}`} role="note">
      {children}
    </p>
  );
}

export function StockStatus({ qty, reorder }: { qty: number; reorder: number }) {
  if (qty < reorder) return <Badge tone="bad">Low stock</Badge>;
  if (qty === reorder) return <Badge tone="warn">At reorder level</Badge>;
  return <Badge tone="ok">In stock</Badge>;
}
