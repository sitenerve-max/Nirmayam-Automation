// Fictional sample data only. Not Niramayam's records, figures or staff.

export const roles = ["Owner", "Clinic manager", "Front desk", "Physiotherapist", "Finance/admin"] as const;
export type Role = (typeof roles)[number];

export type Tone = "ok" | "warn" | "bad" | "info" | "muted";

export const staff: { name: string; role: Role; checkIn: string; checkOut: string; attendance: string; shift: string; tone: Tone }[] = [
  { name: "Asha Verma (sample)", role: "Clinic manager", checkIn: "08:45", checkOut: "—", attendance: "Present", shift: "Morning", tone: "ok" },
  { name: "Rohan Mehta (sample)", role: "Physiotherapist", checkIn: "08:52", checkOut: "—", attendance: "Present", shift: "Morning", tone: "ok" },
  { name: "Neha Iyer (sample)", role: "Physiotherapist", checkIn: "09:24", checkOut: "—", attendance: "Late mark", shift: "Morning", tone: "warn" },
  { name: "Kabir Shah (sample)", role: "Front desk", checkIn: "09:00", checkOut: "—", attendance: "Present", shift: "General", tone: "ok" },
  { name: "Meera Nair (sample)", role: "Finance/admin", checkIn: "—", checkOut: "—", attendance: "On leave", shift: "General", tone: "info" },
  { name: "Dev Patel (sample)", role: "Physiotherapist", checkIn: "—", checkOut: "—", attendance: "Not checked in", shift: "Evening", tone: "muted" },
];

export const leaveRequests = [
  { id: "l1", title: "Neha Iyer (sample) — 2 days", detail: "Casual leave · 3 appointments may need reassignment", role: "Clinic manager" },
  { id: "l2", title: "Kabir Shah (sample) — 1 day", detail: "Personal leave · front-desk cover available", role: "Clinic manager" },
];

export const payrollInputs = [
  { label: "Days present", value: "Counted from check-ins" },
  { label: "Late marks", value: "Counted against the shift rule" },
  { label: "Approved leave", value: "Taken from the approval log" },
  { label: "Overtime / adjustments", value: "Entered and approved by manager" },
];

export type Access = "edit" | "view" | "none";
export const permissions: { area: string; access: Record<Role, Access> }[] = [
  { area: "Patient records", access: { Owner: "view", "Clinic manager": "view", "Front desk": "edit", Physiotherapist: "edit", "Finance/admin": "none" } },
  { area: "Clinical notes", access: { Owner: "none", "Clinic manager": "none", "Front desk": "none", Physiotherapist: "edit", "Finance/admin": "none" } },
  { area: "Appointments", access: { Owner: "view", "Clinic manager": "edit", "Front desk": "edit", Physiotherapist: "view", "Finance/admin": "none" } },
  { area: "Attendance & leave", access: { Owner: "view", "Clinic manager": "edit", "Front desk": "view", Physiotherapist: "view", "Finance/admin": "view" } },
  { area: "Payroll inputs", access: { Owner: "edit", "Clinic manager": "view", "Front desk": "none", Physiotherapist: "none", "Finance/admin": "edit" } },
  { area: "Inventory", access: { Owner: "view", "Clinic manager": "edit", "Front desk": "view", Physiotherapist: "view", "Finance/admin": "view" } },
  { area: "Collections & expenses", access: { Owner: "view", "Clinic manager": "view", "Front desk": "view", Physiotherapist: "none", "Finance/admin": "edit" } },
  { area: "Owner reports", access: { Owner: "edit", "Clinic manager": "view", "Front desk": "none", Physiotherapist: "none", "Finance/admin": "view" } },
];

export const inventory = [
  { item: "Kinesio tape", type: "Consumable", qty: 42, reorder: 20, vendor: "Vendor A (sample)" },
  { item: "Resistance bands", type: "Equipment", qty: 11, reorder: 8, vendor: "Vendor B (sample)" },
  { item: "Hot pack covers", type: "Consumable", qty: 14, reorder: 15, vendor: "Vendor A (sample)" },
  { item: "Electrode pads", type: "Consumable", qty: 24, reorder: 24, vendor: "Vendor C (sample)" },
  { item: "Therapy gel", type: "Consumable", qty: 6, reorder: 10, vendor: "Vendor C (sample)" },
  { item: "Disposable clinic supplies", type: "Consumable", qty: 120, reorder: 60, vendor: "Vendor D (sample)" },
];

export const purchaseRequests = [
  { id: "p1", title: "Therapy gel — 24 units", detail: "Vendor C (sample) · requested by Clinic manager", role: "Owner" },
  { id: "p2", title: "Hot pack covers — 30 units", detail: "Vendor A (sample) · requested by Clinic manager", role: "Owner" },
  { id: "p3", title: "Electrode pads — 50 units", detail: "Vendor C (sample) · drafted at reorder level", role: "Owner" },
];

export const stockMovements = [
  { date: "Oct 14", item: "Therapy gel", change: "−2", reason: "Used in sessions" },
  { date: "Oct 13", item: "Kinesio tape", change: "+30", reason: "Purchase received" },
  { date: "Oct 13", item: "Electrode pads", change: "−6", reason: "Used in sessions" },
  { date: "Oct 12", item: "Hot pack covers", change: "−4", reason: "Replaced worn covers" },
];

// Whole INR amounts. Always shown with a "sample" / "example" / "prototype estimate" label.
export const incomeLines = [
  { label: "Daily collections", amount: 148000, tag: "Sample collection" },
  { label: "Package payments", amount: 212000, tag: "Sample collection" },
];
export const pendingPayments = 38000;
export const refunds = 6000;
export const expenseLines = [
  { label: "Staff salary expenses", amount: 186000, tag: "Example expense" },
  { label: "Inventory expenses", amount: 24000, tag: "Example expense" },
  { label: "Rent and utilities", amount: 62000, tag: "Example expense" },
  { label: "Other expenses", amount: 15000, tag: "Example expense" },
];

export const weeklyCollections = [
  { week: "Week 1", amount: 84000 },
  { week: "Week 2", amount: 92000 },
  { week: "Week 3", amount: 88000 },
  { week: "Week 4", amount: 96000 },
];

export const reportItems = [
  "Gross collection and pending payments",
  "Operating expenses by category",
  "Estimated operating profit",
  "Attendance and leave summary",
  "Low-stock items and purchase status",
  "Missed visits and follow-up results",
];

export const enquirySources = ["Website", "Instagram", "Google", "WhatsApp"];

export const patientSteps = [
  { title: "Enquiry capture", detail: "Website, Instagram, Google and WhatsApp enquiries land in one queue.", role: "Front desk" },
  { title: "Basic information", detail: "Name, contact and how they found the clinic.", role: "Front desk" },
  { title: "Reason for visit", detail: "Recorded in the patient’s own words. Not interpreted by the system.", role: "Front desk" },
  { title: "Preferred time", detail: "Preferred days and times are matched to open slots.", role: "Front desk" },
  { title: "Therapist assignment", detail: "Suggested by availability; confirmed by a person.", role: "Clinic manager" },
  { title: "Appointment confirmation", detail: "Calendar entry created with a clear next action.", role: "Front desk" },
  { title: "Reminder", detail: "Reminder drafted and held for approval before any sending.", role: "Front desk" },
  { title: "Assessment task", detail: "Template opened for the therapist at the first visit.", role: "Physiotherapist" },
  { title: "Treatment-plan milestones", detail: "Milestones and review dates tracked. Plan content stays with the therapist.", role: "Physiotherapist" },
  { title: "Session attendance", detail: "Attended, missed or rescheduled — one tap per session.", role: "Physiotherapist" },
  { title: "Package / payment status", detail: "Package balance and pending amounts visible to finance.", role: "Finance/admin" },
  { title: "Missed-visit follow-up", detail: "Missed visits create a message ready for approval.", role: "Clinic manager" },
  { title: "Progress review reminder", detail: "A review task appears when a milestone date is reached.", role: "Physiotherapist" },
];

export const followUpQueues = [
  { id: "f1", title: "Missed appointment — Patient A (sample)", detail: "Missed yesterday’s 11:00 session · reschedule message", role: "Clinic manager" },
  { id: "f2", title: "Completed treatment plan — Patient B (sample)", detail: "Plan ended · feedback request", role: "Clinic manager" },
  { id: "f3", title: "Progress review due — Patient C (sample)", detail: "Milestone date reached · review reminder", role: "Physiotherapist" },
  { id: "f4", title: "Review request — Patient D (sample)", detail: "Eligible after feedback · review request wording", role: "Owner" },
  { id: "f5", title: "Reactivation — Patient E (sample)", detail: "No visit for 60 days · check-in message", role: "Clinic manager" },
];

export const phases = [
  { tag: "Phase 1", name: "Foundation", items: ["Enquiry capture", "Appointment calendar", "Therapist assignment", "Reminders", "Front-desk workflow"] },
  { tag: "Phase 2", name: "Care and people", items: ["Assessment templates", "Treatment-plan tracking", "Staff attendance", "Leave management", "Payroll inputs"] },
  { tag: "Phase 3", name: "Business control", items: ["Inventory", "Purchase requests", "Collections", "Expenses", "Owner reports"] },
  { tag: "Phase 4", name: "Retention", items: ["Missed-visit follow-up", "Feedback", "Approved review requests", "Progress reminders", "Patient reactivation"] },
];

export const discoveryQuestions = [
  "How are enquiries currently recorded?",
  "How are appointments assigned?",
  "How is attendance recorded?",
  "How are salaries calculated?",
  "Which equipment and consumables are tracked?",
  "How are expenses recorded?",
  "Which reports does the owner check monthly?",
  "Which messages are sent through WhatsApp?",
  "Who can access patient and financial data?",
  "Which module should be built first?",
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
