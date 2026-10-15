// Plain-language content for the overview. Fictional demo data only.

export const heroStory = [
  { label: "Today", text: "Information is usually spread across WhatsApp, calls, notebooks and spreadsheets." },
  { label: "With automation", text: "Each enquiry, appointment, payment, staff update and follow-up gets a clear next action." },
  { label: "Result", text: "The owner gets a simple view of what is happening and what needs attention." },
];

export const problems = [
  {
    key: "enquiries",
    title: "Patient enquiries",
    problem: "Enquiries are missed between calls and WhatsApp messages.",
    solution: "Every enquiry creates a follow-up task and appointment next step.",
    who: "Front desk",
    result: "No enquiry is forgotten.",
  },
  {
    key: "appointments",
    title: "Appointments",
    problem: "Front-desk staff manually coordinate slots and reminders.",
    solution: "Appointments, therapist assignment and reminders stay in one flow.",
    who: "Front desk",
    result: "Fewer calls to arrange and remind.",
  },
  {
    key: "staff",
    title: "Staff management",
    problem: "Attendance, leave and salary inputs are tracked separately.",
    solution: "Attendance and leave approvals create a clean monthly payroll summary.",
    who: "Clinic manager",
    result: "A ready summary at month end.",
  },
  {
    key: "stock",
    title: "Inventory and expenses",
    problem: "Stock and expenses are difficult to review at month end.",
    solution: "Low-stock alerts, purchase requests and expense categories stay organised.",
    who: "Clinic manager and finance/admin",
    result: "Stock and costs are easy to review.",
  },
  {
    key: "owner",
    title: "Owner visibility",
    problem: "The owner cannot quickly see collections, expenses and pending work.",
    solution: "One owner view shows the most important business signals.",
    who: "Owner",
    result: "One place to see what needs attention.",
  },
];

export const journeySteps = [
  { key: "enquiry", title: "Enquiry", text: "Patient contacts the clinic." },
  { key: "care", title: "Care", text: "Appointment, assessment and treatment plan are organised." },
  { key: "operations", title: "Operations", text: "Staff, stock, expenses and payments are tracked." },
  { key: "followup", title: "Follow-up", text: "Missed visits, progress checks and approved messages are queued." },
];

export const patientStory = [
  { title: "Enquiry received", system: "Creates the enquiry record from the WhatsApp message.", human: "Front desk reads it and confirms the patient details." },
  { title: "Front desk assigned", system: "Assigns the enquiry to a front-desk owner and sets a reply task.", human: "The front-desk owner replies to the patient." },
  { title: "Appointment suggested", system: "Suggests an available slot with a therapist.", human: "Front desk confirms the appointment with the patient." },
  { title: "Reminder prepared", system: "Prepares a reminder message and holds it for approval.", human: "Staff approves the wording. Nothing is sent automatically." },
  { title: "Assessment task created", system: "Opens an assessment task for the therapist at the first visit.", human: "The physiotherapist carries out the assessment and records the findings." },
  { title: "Treatment plan started", system: "Tracks milestones and review dates entered by the therapist.", human: "The physiotherapist decides the treatment plan." },
  { title: "Payment recorded", system: "Updates the package balance and pending amount.", human: "Front desk or finance confirms the payment was received." },
  { title: "Follow-up reminder created", system: "Adds a progress-check reminder to the follow-up queue.", human: "The clinic manager approves the message before it is sent." },
];

export const automated = [
  "Create enquiry record",
  "Create appointment task",
  "Prepare reminders",
  "Track attendance",
  "Alert for low inventory",
  "Categorise expenses",
  "Prepare owner reports",
  "Create follow-up queue",
];

export const humanControl = [
  "Confirm patient information",
  "Approve messages",
  "Conduct assessment",
  "Decide treatment",
  "Approve refunds",
  "Approve purchases",
  "Approve payroll",
  "Make clinical decisions",
];

export type Scenario = {
  id: string;
  label: string;
  blurb: string;
  trigger: string;
  system: string;
  human: string;
  result: string;
  before: string;
  after: string;
};

export const scenarios: Scenario[] = [
  {
    id: "enquiry",
    label: "New patient enquiry",
    blurb: "A message arrives on WhatsApp.",
    trigger: "A new enquiry arrives from WhatsApp or Instagram.",
    system: "Creates the enquiry record, assigns the front desk and suggests a slot.",
    human: "Front desk confirms the patient details and appointment.",
    result: "Enquiry status changes to Appointment confirmed.",
    before: "New enquiry",
    after: "Appointment confirmed",
  },
  {
    id: "missed",
    label: "Patient missed an appointment",
    blurb: "Nobody arrived for the booked slot.",
    trigger: "A patient is not marked present within 15 minutes of the slot.",
    system: "Marks the session as missed and drafts a reschedule message.",
    human: "Clinic manager reviews and approves the message.",
    result: "Follow-up status changes to Message ready for approval.",
    before: "Booked",
    after: "Missed — message ready for approval",
  },
  {
    id: "checkin",
    label: "Staff checked in",
    blurb: "A therapist arrives for the shift.",
    trigger: "A therapist taps check-in at 08:52.",
    system: "Records attendance and marks the therapist available for bookings.",
    human: "Nobody needs to act when check-in is on time.",
    result: "Attendance changes to Present.",
    before: "Not checked in",
    after: "Present",
  },
  {
    id: "stock",
    label: "Inventory is low",
    blurb: "A supply has run down to its minimum.",
    trigger: "Inventory quantity reached the reorder level.",
    system: "Creates a purchase request and alerts the manager.",
    human: "Manager reviews and approves the purchase.",
    result: "Purchase status changes to Approved. No order is placed in this demo.",
    before: "No purchase request",
    after: "Purchase request approved",
  },
  {
    id: "expense",
    label: "Expense was added",
    blurb: "Admin enters a bill for clinic supplies.",
    trigger: "Finance/admin enters a clinic supplies expense.",
    system: "Files it under an expense category and updates the monthly total.",
    human: "Finance/admin attaches the bill and checks the entry.",
    result: "The estimated monthly profit is recalculated.",
    before: "Expense not recorded",
    after: "Recorded under Inventory",
  },
  {
    id: "report",
    label: "Month-end report is ready",
    blurb: "The month closes.",
    trigger: "The month ends.",
    system: "Gathers collections, expenses, attendance and stock into one report.",
    human: "The owner reviews the report and decides what to act on.",
    result: "Report status changes to Ready for review.",
    before: "Report not started",
    after: "Ready for review",
  },
];

export const modules = [
  {
    title: "Patient enquiries and appointments",
    problem: "Enquiries and bookings are handled across calls and chats.",
    automate: "Enquiry records, slot suggestions, therapist assignment and reminders.",
    owner: "Which enquiries are waiting and which appointments are confirmed.",
    href: "/patient-flow",
  },
  {
    title: "Staff attendance and salary inputs",
    problem: "Attendance, leave and salary details are kept separately.",
    automate: "Check-ins, late marks, leave approvals and a monthly summary.",
    owner: "Who is present, who is on leave and the payroll inputs.",
    href: "/team-operations",
  },
  {
    title: "Inventory and equipment",
    problem: "Low stock is noticed late.",
    automate: "Stock levels, low-stock alerts and purchase requests.",
    owner: "What is running low and which purchases await approval.",
    href: "/inventory",
  },
  {
    title: "Collections, expenses and profit",
    problem: "Month-end figures take time to put together.",
    automate: "Recording payments and expenses by category.",
    owner: "Total collected, monthly expenses and estimated profit.",
    href: "/finance",
  },
  {
    title: "Follow-ups and patient continuity",
    problem: "Missed visits and progress checks depend on memory.",
    automate: "A follow-up queue with messages drafted for approval.",
    owner: "Who needs a follow-up and which messages await approval.",
    href: "/patient-flow#follow-up",
  },
];
