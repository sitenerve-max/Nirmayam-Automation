export type QuestionType = "text" | "longtext" | "number" | "choice" | "multichoice" | "priorities" | "workflow";

export type PriorityLevel = "high" | "later";
export type MapLane = "patient" | "team" | "inventory" | "finance" | "owner";

export type PriorityItem = {
  id: string;
  label: string;
  lane: MapLane;
  /** Pipe-separated keywords in order of preference. Places a patient-lane item under the first journey step containing the earliest matching keyword. */
  stepMatch?: string;
};

export type Question = {
  id: string;
  label: string;
  type: QuestionType;
  help?: string;
  example?: string;
  required?: boolean;
  options?: string[];
  allowOther?: boolean;
  /** Defaults to true. Set false to hide the "Not sure yet" tick box. */
  allowNotSure?: boolean;
  items?: PriorityItem[];
  defaultSteps?: string[];
  suggestedSteps?: string[];
  rows?: number;
};

export type Section = {
  id: string;
  title: string;
  short: string;
  intro: string;
  questions: Question[];
};

export type Answer = {
  text?: string;
  selected?: string[];
  other?: string;
  notSure?: boolean;
  levels?: Record<string, PriorityLevel>;
  steps?: string[];
};

export type Answers = Record<string, Answer>;

export type SavedState = {
  version: 1;
  answers: Answers;
  step: number;
  updatedAt: string;
};

export type MapTag = { label: string; level: PriorityLevel };
export type MapStep = { name: string; tags: MapTag[] };
export type MapLaneData = { id: MapLane; title: string; items: MapTag[] };
export type AutomationMapData = {
  steps: MapStep[];
  across: MapTag[];
  lanes: MapLaneData[];
  hasPriorities: boolean;
};
