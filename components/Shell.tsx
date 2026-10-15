"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Boxes, HeartPulse, LayoutDashboard, Menu, Route, ShieldAlert, Users, Wallet, Workflow, X } from "lucide-react";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/workflow", label: "Workflow", icon: Workflow },
  { href: "/patient-flow", label: "Patient flow", icon: HeartPulse },
  { href: "/team-operations", label: "Team operations", icon: Users },
  { href: "/inventory", label: "Inventory", icon: Boxes },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/roadmap", label: "Roadmap", icon: Route },
];

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="app">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <aside className={`sidebar${open ? " is-open" : ""}`} aria-label="Primary">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>
            <strong>NIRAMAYAM CARE OS</strong>
            <small>Business Automation Blueprint</small>
          </span>
        </div>
        <nav>
          <ul>
            {nav.map(({ href, label, icon: Icon }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link href={href} aria-current={active ? "page" : undefined} className={active ? "is-active" : ""}>
                    <Icon size={18} aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="by">
          by <strong>SiteNerve</strong>
          <span>Concept prototype — not a live system</span>
        </p>
      </aside>
      {open ? <button className="scrim" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}

      <div className="content">
        <div className="topbar">
          <button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <p className="banner">
            <ShieldAlert size={16} aria-hidden="true" />
            Concept prototype — sample data only — final workflow will be confirmed with Niramayam.
          </p>
        </div>
        <main id="main">{children}</main>
        <footer className="foot">
          <p>
            <strong>Security and privacy notice.</strong> This prototype uses fictional sample data. Before production use, the system requires secure
            authentication, role-based permissions, backups, audit logs, privacy controls and approved messaging integrations.
          </p>
          <p>Clinical decisions remain with qualified physiotherapists. This is a concept proposal, not a final quotation or production system.</p>
        </footer>
      </div>
    </div>
  );
}
