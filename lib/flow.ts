// All values in this file are fictional sample data for a concept prototype.

export type Stage = {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  human: string[];
  owner: string;
  output: string;
  status: string;
};

export const stages: Stage[] = [
  {
    id: "enquiry",
    name: "Enquiry",
    trigger: "New enquiry received from WhatsApp or Instagram",
    actions: ["Create enquiry record", "Assign front-desk owner", "Suggest available slot", "Create reminder task"],
    human: ["Confirm patient information", "Approve communication", "Make clinical decisions"],
    owner: "Front desk",
    output: "Confirmed appointment with a clear next action",
    status: "3 enquiries waiting",
  },
  {
    id: "appointment",
    name: "Appointment",
    trigger: "Front desk confirms a slot with the patient",
    actions: ["Match slot to therapist availability", "Block calendar time", "Queue reminder for approval", "Prepare first-visit checklist"],
    human: ["Confirm therapist assignment", "Approve reminder wording"],
    owner: "Front desk",
    output: "Calendar entry with therapist, time and reminder task",
    status: "12 booked today",
  },
  {
    id: "assessment",
    name: "Assessment",
    trigger: "Patient arrives for the first visit",
    actions: ["Open assessment template", "Create assessment task for therapist", "Log arrival time"],
    human: ["Perform the assessment", "Record clinical findings", "All clinical decisions"],
    owner: "Physiotherapist",
    output: "Completed assessment record owned by the therapist",
    status: "2 assessments pending",
  },
  {
    id: "plan",
    name: "Treatment Plan",
    trigger: "Therapist saves a treatment plan",
    actions: ["Create plan milestones", "Schedule review dates", "Link package to the plan"],
    human: ["Define the plan and number of sessions", "Explain the plan to the patient"],
    owner: "Physiotherapist",
    output: "Plan with milestones and review reminders",
    status: "18 active plans",
  },
  {
    id: "sessions",
    name: "Session Tracking",
    trigger: "Patient attends or misses a session",
    actions: ["Mark attendance", "Update package balance", "Log consumables used", "Flag missed visits"],
    human: ["Confirm session notes", "Decide on rescheduling"],
    owner: "Physiotherapist",
    output: "Up-to-date attendance and package balance",
    status: "9 sessions today",
  },
  {
    id: "payment",
    name: "Payment",
    trigger: "Session or package payment is recorded",
    actions: ["Record the collection", "Update pending balance", "Prepare receipt for approval"],
    human: ["Receive and confirm payment", "Approve refunds"],
    owner: "Finance/admin",
    output: "Reconciled collection with pending amounts visible",
    status: "5 payments pending",
  },
  {
    id: "followup",
    name: "Follow-up",
    trigger: "Missed visit, completed plan or review date reached",
    actions: ["Add patient to follow-up queue", "Draft message for approval", "Schedule progress review"],
    human: ["Approve every message before sending", "Decide who to contact"],
    owner: "Clinic manager",
    output: "Message ready for approval — nothing is sent automatically",
    status: "4 messages need approval",
  },
  {
    id: "report",
    name: "Owner Report",
    trigger: "Month end or owner request",
    actions: ["Roll up collections and expenses", "Summarise attendance and stock", "Compile follow-up results"],
    human: ["Review figures", "Decide next actions"],
    owner: "Owner",
    output: "One-page monthly report for the owner",
    status: "Draft for the month",
  },
];

export type Scenario = {
  id: string;
  label: string;
  stageId: string;
  trigger: string;
  steps: string[];
  role: string;
  nextAction: string;
  stageStatus: string;
  message: string;
};

export const scenarios: Scenario[] = [
  {
    id: "enquiry",
    label: "New patient enquiry",
    stageId: "enquiry",
    trigger: "Sample enquiry arrives from Instagram: “Do you have a slot this week?”",
    steps: ["Enquiry record created", "Front-desk owner assigned", "Available slot suggested", "Reminder task created"],
    role: "Front desk",
    nextAction: "Confirm patient details and approve the reply",
    stageStatus: "New enquiry logged",
    message: "Enquiry captured and assigned. Reply is waiting for staff approval.",
  },
  {
    id: "missed",
    label: "Patient misses appointment",
    stageId: "followup",
    trigger: "Sample patient is not marked present within 15 minutes of the slot",
    steps: ["Session marked as missed", "Patient added to missed-visit queue", "Reschedule message drafted", "Package balance left unchanged"],
    role: "Clinic manager",
    nextAction: "Review and approve the drafted message",
    stageStatus: "Missed visit queued",
    message: "Missed visit flagged. Message ready for approval — nothing was sent.",
  },
  {
    id: "checkin",
    label: "Staff checks in",
    stageId: "sessions",
    trigger: "Sample therapist taps check-in at 08:52",
    steps: ["Attendance recorded", "Shift matched to roster", "Therapist marked available for bookings", "Late-mark rule checked"],
    role: "Physiotherapist",
    nextAction: "None — on time, schedule is open",
    stageStatus: "Therapist on duty",
    message: "Check-in recorded on time. Calendar availability updated.",
  },
  {
    id: "leave",
    label: "Staff applies for leave",
    stageId: "appointment",
    trigger: "Sample staff member requests 2 days of leave",
    steps: ["Leave request logged", "Booked appointments in the range found", "Approver notified in the app", "Payroll input held until decision"],
    role: "Clinic manager",
    nextAction: "Approve or reject, then reassign affected slots",
    stageStatus: "Slots at risk — leave pending",
    message: "Leave request is awaiting approval. 3 appointments may need reassignment.",
  },
  {
    id: "stock",
    label: "Inventory reaches reorder level",
    stageId: "sessions",
    trigger: "Sample stock of electrode pads drops to the reorder level",
    steps: ["Low-stock flag raised", "Usual vendor looked up", "Purchase request drafted", "Approval task created"],
    role: "Clinic manager",
    nextAction: "Approve the purchase request",
    stageStatus: "Low stock — purchase drafted",
    message: "Purchase request drafted and waiting for approval. No order was placed.",
  },
  {
    id: "expense",
    label: "Expense is added",
    stageId: "report",
    trigger: "Sample expense entered: clinic supplies",
    steps: ["Expense recorded with category", "Monthly operating expense updated", "Estimated profit recalculated", "Entry added to audit trail"],
    role: "Finance/admin",
    nextAction: "Attach the bill and mark as verified",
    stageStatus: "Expenses updated",
    message: "Expense logged. Prototype estimate for operating profit recalculated.",
  },
  {
    id: "report",
    label: "Monthly report generated",
    stageId: "report",
    trigger: "Sample month-end schedule reached",
    steps: ["Collections totalled", "Expenses and salary inputs summed", "Stock and attendance summarised", "Follow-up results compiled"],
    role: "Owner",
    nextAction: "Review the report and note decisions",
    stageStatus: "Report ready for review",
    message: "Monthly owner report generated from sample data.",
  },
];
