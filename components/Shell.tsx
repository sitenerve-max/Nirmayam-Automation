"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const main = [
  { href: "/", label: "Overview" },
  { href: "/patient-flow", label: "Patient flow" },
  { href: "/team-operations", label: "Team" },
  { href: "/finance", label: "Finance" },
  { href: "/roadmap", label: "Implementation plan" },
];
const more = [
  { href: "/workflow", label: "Detailed workflow" },
  { href: "/inventory", label: "Inventory" },
];
const INTAKE = "/workflow-intake";
const steps = ["Understand the idea", "Review the workflow", "Confirm requirements in a meeting"];

const stepFor = (path: string) => (path === "/" ? 1 : path.startsWith("/roadmap") || path.startsWith(INTAKE) ? 3 : 2);

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const step = stepFor(pathname);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const moreActive = more.some((m) => isActive(m.href));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeBtn.current?.focus();
    else if (wasOpen.current) menuBtn.current?.focus();
    wasOpen.current = open;
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function onDrawerKey(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key !== "Tab" || !drawer.current) return;
    const items = drawer.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const link = ({ href, label }: { href: string; label: string }) => (
    <li key={href}>
      <Link href={href} aria-current={isActive(href) ? "page" : undefined} className={isActive(href) ? "is-active" : ""}>
        {label}
      </Link>
    </li>
  );

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-head" inert={open}>
        <div className="site-bar">
          <Link href="/" className="wordmark" aria-label="Niramayam Physio × SiteNerve, home">
            <span className="wm-mark" aria-hidden="true">N</span>
            <span>
              <strong>Niramayam</strong> <i>×</i> SiteNerve
            </span>
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <ul>
              {main.map(link)}
              <li>
                <details className={`more${moreActive ? " is-active" : ""}`}>
                  <summary>View all modules</summary>
                  <ul>{more.map(link)}</ul>
                </details>
              </li>
            </ul>
          </nav>
          <Link href={INTAKE} className="btn btn-accent head-cta">
            Map Your Hospital Workflow
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className="menu-btn"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="site-sub">
          <p className="stepper">
            <span className="stepper-dots" aria-hidden="true">
              {steps.map((s, i) => (
                <i key={s} className={i + 1 <= step ? "on" : ""} />
              ))}
            </span>
            <span>Step {step} of 3 — {steps[step - 1]}</span>
          </p>
          <span className="sample-pill">Concept proposal · sample data only</span>
        </div>
      </header>

      {open ? (
        <div className="drawer" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu" ref={drawer} onKeyDown={onDrawerKey}>
          <div className="drawer-top">
            <span className="wordmark"><strong>Niramayam</strong> <i>×</i> SiteNerve</span>
            <button ref={closeBtn} type="button" className="menu-btn" aria-label="Close menu" aria-controls="mobile-nav" onClick={() => setOpen(false)}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul>
              {[...main, ...more].map(link)}
            </ul>
          </nav>
          <Link href={INTAKE} className="btn btn-accent btn-lg">
            Map Your Hospital Workflow <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p className="drawer-note">Concept proposal. Sample data only. Not a live system.</p>
        </div>
      ) : (
        <div id="mobile-nav" hidden />
      )}

      <main id="main" inert={open}>
        {children}
      </main>
      <footer className="foot" inert={open}>
        <div className="foot-grid">
          <p>
            <strong>Privacy and security.</strong> This prototype uses fictional sample data. Production use needs secure sign-in, role-based access, backups,
            audit logs, privacy controls and approved messaging integrations.
          </p>
          <p>Automation organises the work. Qualified physiotherapists remain responsible for clinical decisions.</p>
          <p>
            <Link href={INTAKE}>Map your hospital workflow</Link> · Concept proposal by SiteNerve, not a final quotation.
          </p>
        </div>
      </footer>
    </>
  );
}
