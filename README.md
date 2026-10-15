# Niramayam Care OS — Business Automation Blueprint

A stakeholder-facing **concept prototype** by SiteNerve for Niramayam Physio & Rehabilitation Centre. It shows how patient flow, staff operations, inventory, expenses, finance and follow-ups could be connected into one organised system.

It is **not** a public clinic website, a production system or a final quotation. Everything on screen is fictional sample data.

## Purpose

Give the owner a clickable walkthrough of the proposed automation so the 15-minute discovery meeting can focus on Niramayam's real workflow rather than abstract features.

## Routes

| Route | Content |
| --- | --- |
| `/` | Overview, summary cards, interactive workflow canvas, scenario simulator and activity timeline |
| `/workflow` | End-to-end workflow canvas, automation vs human responsibilities, how modules connect |
| `/patient-flow` | Enquiry-to-review journey, clinical boundary, follow-up and retention approval queue |
| `/team-operations` | Attendance, leave approval, payroll inputs, role-permission matrix |
| `/inventory` | Stock, reorder alerts, purchase requests, stock movement |
| `/finance` | Collections, expenses, estimated operating profit, monthly report contents |
| `/roadmap` | Four implementation phases, discovery questions, meeting request button |
| `/portal`, `/plan` | Redirect to `/` and `/workflow` |

## Local setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Automation modules

1. **Patient flow** — enquiry capture, appointment, assessment task, plan milestones, session attendance, package status.
2. **Team operations** — check-in/out, shifts, late marks, leave approval, payroll inputs (no salary calculation).
3. **Inventory** — equipment and consumables, reorder levels, vendor, purchase-request approval, movement history.
4. **Finance** — collections, pending payments, refunds, expenses, estimated operating profit.
5. **Follow-up and retention** — missed visits, completed plans, review requests, reactivation. Messages show as "Message ready for approval" and can be approved locally ("Needs approval" → "Approved for sending").

## Demo limitations

- Local React state only. No backend, database, authentication or external API calls. Refreshing the page resets everything.
- System fonts only, so no font requests leave the browser.
- No WhatsApp or email is sent, no order is placed, no payment is processed, no meeting is booked.
- No diagnosis, treatment recommendation or clinical logic. Clinical decisions remain with qualified physiotherapists.
- All names, quantities and amounts are invented and labelled as sample data, example expenses or prototype estimates.

## Production requirements

Before real use the system needs secure authentication, role-based permissions, backups, audit logs, privacy controls and approved messaging integrations (including consent handling for patient messages), plus review of applicable health-data and privacy obligations.

## Discovery meeting checklist

- [ ] How are enquiries currently recorded?
- [ ] How are appointments assigned?
- [ ] How is attendance recorded?
- [ ] How are salaries calculated?
- [ ] Which equipment and consumables are tracked?
- [ ] How are expenses recorded?
- [ ] Which reports does the owner check monthly?
- [ ] Which messages are sent through WhatsApp?
- [ ] Who can access patient and financial data?
- [ ] Which module should be built first?
