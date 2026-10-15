# Niramayam Physio — Automation Plan

## Positioning

This demo presents a proposed **Care Operating System** for a physiotherapy and rehabilitation clinic. It is not a medical diagnosis system and it does not replace qualified physiotherapists.

## Core workflow

`Enquiry → Appointment → Assessment → Treatment plan → Session status → Payment → Follow-up`

### 1. Patient and enquiry flow

- Capture enquiries from the website, Instagram, Google Business Profile, phone and WhatsApp.
- Create one enquiry record with name, phone, source, reason for visit and preferred time.
- Assign a front-desk owner and proposed therapist.
- Confirm a slot and send a consent-based reminder.
- Create a first-visit checklist and assessment task.
- Track plan milestones, completed sessions, payment status and next follow-up.

### 2. Team operations

- Staff check-in and check-out.
- Daily on-duty view for the owner or manager.
- Leave request and approval workflow.
- Late-mark and missing-attendance alerts.
- Monthly payroll input export for approved hours and leave.

### 3. Inventory and equipment

- Categorise consumables, therapy supplies and equipment.
- Set reorder levels for each item.
- Alert when stock reaches the reorder level.
- Create purchase requests with vendor, amount and approval status.
- Maintain stock movement history.

### 4. Finance and management reports

- Record session payments, packages, refunds and pending amounts.
- Record expenses by category with receipt reference.
- Separate collections, salaries, supplies, rent and other costs.
- Show monthly collections, operating expenses and estimated operating profit.
- Export owner reports for accountant review.

### 5. Retention and follow-up

- Queue follow-ups for missed appointments and completed plans.
- Ask for feedback after a completed care plan.
- Create review requests only after permission and an approved message.
- Flag patients due for a progress check.

## Suggested delivery phases

### Phase 1 — Foundation

Website/WhatsApp enquiry capture, appointment calendar, reminders and front-desk status.

### Phase 2 — Care and people

Assessment templates, plan milestones, staff attendance, leave and payroll inputs.

### Phase 3 — Control

Inventory, purchase requests, collections, expenses and owner reports.

### Phase 4 — Retention

Missed-visit queue, feedback, approved review requests and patient reactivation.

## Suggested implementation architecture

- **Frontend:** Next.js and responsive role-based screens.
- **Backend:** secure API with PostgreSQL or Supabase.
- **Automation layer:** n8n, Make or server-side jobs for reminders, alerts and reports.
- **Messaging:** WhatsApp Business API only after provider setup, consent and template approval.
- **Access:** owner, front desk, therapist, finance and manager roles.
- **Audit:** event history for edits, approvals, payments and stock movement.

## Non-negotiable safeguards

- Use fictional data in demos; never use real patient information in a preview.
- Confirm consent before automated WhatsApp or review messages.
- Use role-based access and backups before production launch.
- Keep clinical decisions with qualified physiotherapists.
- Confirm retention, privacy and data-export requirements with the clinic.

## Discovery meeting output

After a 15-minute discovery call, SiteNerve should confirm:

1. Current patient and appointment process.
2. Current staff, attendance and payroll process.
3. Current inventory and purchase process.
4. Current collections, expenses and reporting process.
5. Priority phase, users, timeline, integrations and final quotation.
