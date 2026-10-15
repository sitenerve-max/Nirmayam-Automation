// Detailed workflow stages. Fictional sample data for a concept prototype.

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
    name: "Treatment plan",
    trigger: "Therapist saves a treatment plan",
    actions: ["Create plan milestones", "Schedule review dates", "Link package to the plan"],
    human: ["Define the plan and number of sessions", "Explain the plan to the patient"],
    owner: "Physiotherapist",
    output: "Plan with milestones and review reminders",
    status: "18 active plans",
  },
  {
    id: "sessions",
    name: "Session tracking",
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
    name: "Owner report",
    trigger: "Month end or owner request",
    actions: ["Roll up collections and expenses", "Summarise attendance and stock", "Compile follow-up results"],
    human: ["Review figures", "Decide next actions"],
    owner: "Owner",
    output: "One-page monthly report for the owner",
    status: "Draft for the month",
  },
];
