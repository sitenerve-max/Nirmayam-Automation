import type { PriorityItem, Question, Section } from "./types";

// All questionnaire content lives here. Edit this file to change, add, remove or reorder questions.
// Question ids must stay unique: saved answers are stored against them.

const text = (id: string, label: string, example?: string, extra: Partial<Question> = {}): Question => ({ id, label, type: "text", example, ...extra });
const long = (id: string, label: string, example?: string, extra: Partial<Question> = {}): Question => ({ id, label, type: "longtext", example, rows: 3, ...extra });

export const DEFAULT_FLOW = ["Enquiry", "Appointment", "Registration", "Assessment", "Treatment Plan", "Sessions", "Payment", "Follow-up"];
const SUGGESTED_FLOW = ["Reminder", "Review", "Discharge", "Feedback", "Referral", "Re-visit"];

export const PRIORITY_QUESTION_ID = "automation.priorities";
export const FLOW_QUESTION_ID = "treatment.flow";

export const priorityItems: PriorityItem[] = [
  { id: "enquiry", label: "Patient enquiry management", lane: "patient", stepMatch: "enquir|contact|lead" },
  { id: "booking", label: "Appointment booking", lane: "patient", stepMatch: "appoint|book" },
  { id: "records", label: "Patient records", lane: "patient", stepMatch: "regist|record|intake" },
  { id: "sessions", label: "Treatment and session tracking", lane: "patient", stepMatch: "session|treat|therap" },
  { id: "billing", label: "Billing", lane: "patient", stepMatch: "pay|bill|invoice" },
  { id: "reminders", label: "Reminder automation", lane: "patient", stepMatch: "follow|remind|review|feedback|discharge" },
  { id: "whatsapp", label: "WhatsApp enquiry flow", lane: "patient", stepMatch: "enquir|contact|lead" },
  { id: "attendance", label: "Staff attendance", lane: "team" },
  { id: "leave", label: "Leave management", lane: "team" },
  { id: "salary", label: "Salary management", lane: "team" },
  { id: "inventory", label: "Inventory", lane: "inventory" },
  { id: "expenses", label: "Expenses", lane: "finance" },
  { id: "profit", label: "Profit reports", lane: "finance" },
  { id: "dashboard", label: "Management dashboard", lane: "owner" },
  { id: "branches", label: "Branch-wise reporting", lane: "owner" },
];

export const laneTitles = { patient: "Patient journey", team: "Staff", inventory: "Inventory", finance: "Money", owner: "Owner view" } as const;

export const sections: Section[] = [
  {
    id: "profile",
    title: "Hospital profile",
    short: "Profile",
    intro: "A few basics so we know the size and shape of your hospital. Rough numbers are fine.",
    questions: [
      text("profile.name", "Hospital or clinic name", "Niramayam Physiotherapy Hospital", { required: true, allowNotSure: false }),
      text("profile.owner", "Founder or owner name", "Dr. A. Sharma", { required: true, allowNotSure: false }),
      text("profile.branches", "Number of branches", "1", { type: "number", help: "Enter a whole number." }),
      text("profile.clinicians", "Number of doctors and physiotherapists", "2 doctors, 8 physiotherapists"),
      text("profile.support", "Number of reception and support staff", "3 reception, 2 support staff"),
      text("profile.patients", "Approximate patients per day", "About 40 to 50"),
      long("profile.services", "Main services and treatment categories", "Orthopaedic rehab, neuro rehab, sports injury, post-surgery care, children’s physiotherapy"),
    ],
  },
  {
    id: "enquiry",
    title: "Patient enquiry journey",
    short: "Enquiries",
    intro: "How a new patient first reaches you, and what happens until the first visit.",
    questions: [
      {
        id: "enquiry.channels",
        label: "How do patients contact the hospital?",
        type: "multichoice",
        options: ["Phone", "WhatsApp", "Instagram", "Google", "Website", "Referral", "Walk-in"],
        allowOther: true,
        required: true,
        help: "Tick all that apply.",
      },
      long("enquiry.afterFirst", "What happens after the first enquiry?", "Reception notes the name and number in a register and calls back within the day."),
      text("enquiry.responder", "Who responds to the enquiry?", "Front desk during the day, manager on weekends"),
      long("enquiry.booking", "How is an appointment booked?", "Reception checks the paper diary, offers a slot, then confirms on WhatsApp."),
      long("enquiry.info", "What information is collected before the first visit?", "Name, age, phone, problem area, referring doctor"),
      long("enquiry.missed", "What happens when a patient misses an appointment?", "Reception calls once. If there is no answer we leave it."),
      long("enquiry.followups", "How are follow-ups and revisit appointments managed?", "The therapist tells the patient the next date and the front desk writes it in the diary."),
    ],
  },
  {
    id: "treatment",
    title: "Patient treatment workflow",
    short: "Treatment",
    intro: "Describe how a patient moves through care. Tell us what actually happens today, even if it is informal. We are not judging it.",
    questions: [
      long("treatment.registration", "Patient registration process", "Reception fills a form and assigns a patient number.", { rows: 2 }),
      long("treatment.consultation", "Initial consultation process", "Doctor meets the patient for 20 minutes.", { rows: 2 }),
      long("treatment.assessment", "Assessment and diagnosis workflow", "Describe who does it and where it is written down. Clinical decisions stay with your team.", { rows: 2 }),
      long("treatment.plan", "Treatment plan creation", "Therapist writes the plan and number of sessions.", { rows: 2 }),
      long("treatment.packages", "Session and package management", "Patients buy packages of 10 sessions. We tick sessions in a book.", { rows: 2 }),
      long("treatment.notes", "Daily treatment notes", "Written on paper after each session.", { rows: 2 }),
      long("treatment.assignment", "Doctor or therapist assignment", "Manager assigns by availability and speciality.", { rows: 2 }),
      long("treatment.progress", "Progress tracking", "Therapist reviews every 5 sessions.", { rows: 2 }),
      long("treatment.discharge", "Discharge process", "Doctor confirms discharge and gives a home exercise sheet.", { rows: 2 }),
      long("treatment.review", "Follow-up and review process", "Reception calls after 2 weeks to ask how the patient is.", { rows: 2 }),
      long("treatment.journey", "Please explain your patient journey step by step in your own words.", "First the patient calls. Then…", { rows: 8, required: true, help: "Write it the way you would explain it to a new staff member. Plain words are best." }),
      {
        id: FLOW_QUESTION_ID,
        label: "Build your patient journey as a flow",
        type: "workflow",
        help: "Add, remove and reorder the steps so the flow matches how your hospital really works.",
        defaultSteps: DEFAULT_FLOW,
        suggestedSteps: SUGGESTED_FLOW,
        allowNotSure: false,
      },
    ],
  },
  {
    id: "staff",
    title: "Staff management",
    short: "Staff",
    intro: "How your team is scheduled, paid and tracked.",
    questions: [
      long("staff.roles", "Staff roles", "Doctors, physiotherapists, reception, housekeeping, accounts", { rows: 2 }),
      long("staff.attendance", "Attendance process", "Signature in a register at the front desk.", { rows: 2 }),
      text("staff.shifts", "Shift timings", "Morning 8 to 2, evening 2 to 8"),
      long("staff.leave", "Leave management", "Staff ask the manager on WhatsApp.", { rows: 2 }),
      long("staff.availability", "Therapist availability", "The manager keeps a weekly timetable.", { rows: 2 }),
      long("staff.salary", "Salary calculation process", "Accounts counts present days and adjusts for leave at month end.", { rows: 2 }),
      long("staff.incentives", "Incentives or commission", "Therapists get a share for packages sold.", { rows: 2 }),
      long("staff.performance", "Staff performance tracking", "Owner reviews patient feedback informally.", { rows: 2 }),
      text("staff.tools", "Current attendance or salary tools", "Paper register and Excel"),
    ],
  },
  {
    id: "inventory",
    title: "Inventory management",
    short: "Inventory",
    intro: "The things you use and buy, and how you keep track of them.",
    questions: [
      long("inventory.items", "Equipment and consumables used", "Kinesio tape, electrode pads, gel, hot packs, resistance bands, ultrasound machine", { rows: 3 }),
      text("inventory.tracking", "Current inventory tracking method", "A notebook checked monthly"),
      long("inventory.suppliers", "Suppliers and vendors", "Two medical suppliers and one local shop", { rows: 2 }),
      long("inventory.purchase", "Purchase process", "Manager asks the owner on WhatsApp, then places the order.", { rows: 2 }),
      long("inventory.alerts", "Stock alerts", "Someone notices when the shelf looks empty.", { rows: 2 }),
      long("inventory.expiry", "Expiry tracking", "We check dates when we remember.", { rows: 2 }),
      long("inventory.reorder", "Reorder process", "Same as purchase, usually when stock is nearly finished.", { rows: 2 }),
      long("inventory.maintenance", "Equipment maintenance records", "A service sticker on the machine.", { rows: 2 }),
    ],
  },
  {
    id: "billing",
    title: "Billing and finance",
    short: "Billing",
    intro: "How money comes in and goes out. Please do not share real figures here. Describe the process only.",
    questions: [
      text("billing.consultation", "Consultation charges", "Fixed fee set by the doctor"),
      long("billing.packages", "Session and package billing", "Paid upfront for packages, per session otherwise.", { rows: 2 }),
      {
        id: "billing.modes",
        label: "Payment modes",
        type: "multichoice",
        options: ["Cash", "UPI", "Card", "Bank transfer", "Cheque", "Insurance or third-party payer"],
        allowOther: true,
        help: "Tick all that apply.",
      },
      long("billing.pending", "Pending payment tracking", "Reception remembers who owes money.", { rows: 2 }),
      long("billing.refunds", "Refunds or cancellations", "Owner decides case by case.", { rows: 2 }),
      long("billing.dailyExpenses", "Daily expenses", "Petty cash noted in a book.", { rows: 2 }),
      long("billing.monthlyExpenses", "Monthly expenses", "Rent, electricity and supplies tracked by accounts.", { rows: 2 }),
      long("billing.salaryExpenses", "Salary expenses", "Paid on the 5th by bank transfer.", { rows: 2 }),
      long("billing.profit", "Profit calculation", "Accountant works it out every quarter.", { rows: 2 }),
      text("billing.software", "Current accounting or billing software", "Tally, or none"),
      long("billing.reports", "Reports currently available", "Monthly collection summary from the accountant", { rows: 2 }),
    ],
  },
  {
    id: "communication",
    title: "Communication and follow-up",
    short: "Messages",
    intro: "How you stay in touch with patients. Nothing is sent from this tool.",
    questions: [
      long("communication.appointment", "Appointment reminders", "Reception calls the day before.", { rows: 2 }),
      long("communication.session", "Session reminders", "Patients are expected to remember.", { rows: 2 }),
      long("communication.payment", "Payment reminders", "Reception calls when a payment is overdue.", { rows: 2 }),
      long("communication.feedback", "Patient feedback", "Verbal feedback and occasional Google reviews.", { rows: 2 }),
      long("communication.exercise", "Exercise instructions", "Printed sheet or photos sent on WhatsApp.", { rows: 2 }),
      long("communication.promo", "Festival or promotional communication", "Greetings on WhatsApp status.", { rows: 2 }),
      long("communication.whatsapp", "WhatsApp communication process", "Shared phone used by reception.", { rows: 2 }),
      text("communication.emailSms", "Email or SMS usage", "None, or only for bills"),
    ],
  },
  {
    id: "problems",
    title: "Current problems",
    short: "Problems",
    intro: "This is the most useful part. Be as honest as you like.",
    questions: [
      long("problems.manual", "Which tasks are repeated manually?", "Writing the same patient details in the register, the bill book and WhatsApp."),
      long("problems.mistakes", "Where do mistakes happen?", "Wrong appointment times, missed session counts."),
      long("problems.hardToFind", "Which information is difficult to find?", "Old patient history, who owes money."),
      long("problems.reports", "Which reports take too much time?", "Month-end collection and expense summary."),
      long("problems.followups", "Which follow-ups are missed?", "Patients who stop coming mid-treatment."),
      long("problems.dependency", "What currently depends on one particular staff member?", "Only the manager knows the therapist timetable."),
      long("problems.biggest", "What is the biggest operational problem today?", "We lose patients because nobody follows up.", { rows: 4 }),
    ],
  },
  {
    id: "automation",
    title: "Desired automation",
    short: "Priorities",
    intro: "Choose what would help most. Mark a few areas as High priority and leave the rest for later. We will not automate everything on day one.",
    questions: [
      {
        id: PRIORITY_QUESTION_ID,
        label: "Which areas would you like help with?",
        type: "priorities",
        items: priorityItems,
        required: true,
        help: "For each area choose Skip, Later or High priority.",
      },
    ],
  },
  {
    id: "requirements",
    title: "Final requirements",
    short: "Requirements",
    intro: "Your picture of an ideal system. There are no wrong answers.",
    questions: [
      long("requirements.daily", "What should the ideal system do every day?", "Show today’s appointments, who is absent and what needs a call-back.", { rows: 4 }),
      long("requirements.reports", "Which reports should the owner see?", "Daily collection, pending payments, monthly profit, missed follow-ups", { rows: 3 }),
      long("requirements.access", "Who should have access?", "Owner, manager, doctors, reception, accounts", { rows: 2 }),
      long("requirements.doctors", "What should doctors see?", "Their own patients and schedule", { rows: 2 }),
      long("requirements.reception", "What should reception see?", "Appointments and payments, but not clinical notes", { rows: 2 }),
      long("requirements.restricted", "What should staff not be allowed to access?", "Salaries and profit figures", { rows: 2 }),
      long("requirements.success", "What would make the system successful for Niramayam?", "Fewer missed follow-ups and a month-end report in minutes.", { rows: 4, required: true }),
    ],
  },
];
