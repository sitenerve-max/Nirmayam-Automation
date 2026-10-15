"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Boxes, HeartPulse, LayoutDashboard, ListChecks, Menu, Route, Users, Wallet, Workflow, X } from "lucide-react";

const main = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/patient-flow", label: "Patient flow", icon: HeartPulse },
  { href: "/team-operations", label: "Team", icon: Users },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/roadmap", label: "Implementation plan", icon: Route },
];
const more = [
  { href: "/workflow", label: "Detailed workflow", icon: Workflow },
  { href: "/inventory", label: "Inventory", icon: Boxes },
];
const steps = ["Understand the idea", "Review the workflow", "Confirm requirements in a meeting"];

const stepFor = (path: string) => (path === "/" ? 1 : path.startsWith("/roadmap") ? 3 : 2);

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const step = stepFor(pathname);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const moreActive = more.some((m) => isActive(m.href));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const link = ({ href, label, icon: Icon }: (typeof main)[number]) => (
    <li key={href}>
      <Link href={href} aria-current={isActive(href) ? "page" : undefined} className={isActive(href) ? "is-active" : ""}>
        <Icon size={18} aria-hidden="true" />
        {label}
      </Link>
    </li>
  );

  return (
    <div className="app">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <aside className={`sidebar${open ? " is-open" : ""}`} aria-label="Primary">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>
            <strong>NIRAMAYAM PHYSIO</strong>
            <small>Automation proposal by SiteNerve</small>
          </span>
        </div>
        <nav>
          <ul>{main.map(link)}</ul>
          <details className="more" open={moreActive}>
            <summary>
              <ListChecks size={18} aria-hidden="true" /> View all modules
            </summary>
            <ul>{more.map(link)}</ul>
          </details>
        </nav>
        <p className="by">
          by <strong>SiteNerve</strong>
          <span>Concept proposal — not a live system</span>
        </p>
      </aside>
      {open ? <button className="scrim" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}

      <div className="content">
        <div className="topbar">
          <button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <p className="stepper">
            <span className="stepper-dots" aria-hidden="true">
              {steps.map((s, i) => (
                <i key={s} className={i + 1 <= step ? "on" : ""} />
              ))}
            </span>
            <span>Step {step} of 3 — {steps[step - 1]}</span>
          </p>
          <span className="sample-pill">Sample data only</span>
        </div>
        <main id="main">{children}</main>
        <footer className="foot">
          <p>
            <strong>Privacy and security.</strong> This prototype uses fictional sample data. Production use needs secure sign-in, role-based access, backups,
            audit logs, privacy controls and approved messaging integrations.
          </p>
          <p>Automation organises the work. Qualified physiotherapists remain responsible for clinical decisions.</p>
        </footer>
      </div>
    </div>
  );
}
