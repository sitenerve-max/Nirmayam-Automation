# Niramayam Physio × SiteNerve — Automation Proposal

A concept prototype showing how **Niramayam Physio & Rehabilitation Centre** could run with less manual follow-up. It is a business automation proposal, not a public clinic website, not a live system and not a final quotation. Everything shown is fictional sample data.

## The idea in plain words

- **Today:** information is spread across WhatsApp, calls, notebooks and spreadsheets.
- **With automation:** each enquiry, appointment, payment, staff update and follow-up gets a clear next action.
- **Result:** the owner sees what is happening and what needs attention.

**Automated:** enquiry records, appointment tasks, reminders (prepared, not sent), attendance tracking, low-stock alerts, expense categories, owner reports, follow-up queue.
**Stays human:** confirming patient information, approving messages, assessments, treatment decisions, refunds, purchases, payroll and all clinical decisions.

Recommended start: **Phase 1 — Patient enquiries and appointments.** Final phase selection is confirmed after a 15-minute discovery meeting.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Overview: the problem and solution, five everyday areas, four-step journey (with "Show detailed workflow"), one demo patient journey, automated vs human, sample-event cards, module summaries, recommended starting phase, discovery meeting button |
| `/patient-flow` | Enquiry-to-review steps, clinical boundary, follow-up queue with approve buttons |
| `/team-operations` | Attendance, leave approvals, payroll inputs, role-permission matrix |
| `/finance` | Money collected, money spent, estimated monthly profit (all sample figures) |
| `/roadmap` | Implementation plan (five phases) and discovery questions |
| `/workflow` | Detailed eight-stage workflow with who does what |
| `/inventory` | Stock, reorder alerts, purchase requests, stock movement |
| `/workflow-intake` | **Map Your Hospital Workflow**: ten-section discovery questionnaire, journey builder, review, automation map, download/print |
| `/portal`, `/plan` | Redirect to `/` and `/workflow` |

The sidebar shows Overview, Patient flow, Team, Finance and Implementation plan. "View all modules" opens Detailed workflow and Inventory. A step indicator shows where you are: Step 1 Understand the idea, Step 2 Review the workflow, Step 3 Confirm requirements in a meeting.

## Workflow intake (`/workflow-intake`)

A demo discovery tool for the owner to describe how the hospital works today, in plain language.

**How it works**

1. Ten sections: hospital profile, patient enquiries, treatment workflow, staff, inventory, billing and finance, communication, current problems, desired automation, final requirements.
2. One section per screen with Back, Continue, Save progress and "Save and continue later". Every question allows "Not sure yet"; choice questions allow "Other".
3. Section 3 includes a visual journey builder (add, remove and reorder steps with buttons, no mouse needed).
4. Section 9 lets the owner mark each automation area as Skip, Later or High priority.
5. A review page lists every answer with Edit buttons. Finishing creates the **Niramayam Automation Map**, a sketch of the journey with the chosen areas placed on it.
6. The final screen offers Download My Workflow Summary (JSON), Print or save as PDF, and Copy summary.

**Honest limits.** There is no backend. Answers are saved only in this browser's `localStorage` (key `niramayam-intake-v1`) and nothing is sent to SiteNerve, by email, WhatsApp or any API. The "Schedule a 15-minute Google Meet" button is a demo action and books nothing. The owner shares the downloaded file themselves.

**Editing the questions.** All content is in `lib/intake/config.ts`. Add, remove or reorder questions and sections there. Keep question ids unique, because saved answers are keyed by id. Types are in `lib/intake/types.ts`; validation, summary and map logic are in `lib/intake/logic.ts`; UI is in `components/intake/`.

**Going further later.** To collect responses, add a server route that receives the object from `buildExport()` (in `lib/intake/logic.ts`), behind secure sign-in and with consent wording. Keep any admin area separate from these public pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Deployed on Vercel from `main`. `vercel.json` pins the Next.js framework preset.

## Demo limitations

- Local React state only. No backend, database, sign-in or external API calls. Refreshing resets everything.
- No WhatsApp or email is sent, no order is placed, no payment is processed and no meeting is booked. The meeting button is a demo action.
- No diagnosis or treatment suggestions. Qualified physiotherapists remain responsible for clinical decisions.
- All names, quantities and amounts are invented and labelled as sample data, example expenses or prototype estimates.

## Before real use

Production use needs secure sign-in, role-based access, backups, audit logs, privacy controls and approved messaging integrations. Nothing here claims production readiness or medical compliance.

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
