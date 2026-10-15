import { IntakeWizard } from "@/components/intake/IntakeWizard";
import "./intake.css";

export const metadata = {
  title: "Map Your Hospital Workflow — Niramayam × SiteNerve",
  description: "A demo discovery questionnaire. Describe how your hospital works today. Answers stay in your browser.",
};

export default function WorkflowIntake() {
  return (
    <>
      <header className="page-head intake-head no-print">
        <p className="eyebrow">Discovery questionnaire · Demo</p>
        <h1>Map your hospital workflow.</h1>
        <p className="lead">
          Tell us how your clinic works. We will use your answers to design an automation plan around your actual operations.
        </p>
        <ul className="intake-facts">
          <li>10 short sections, about 20 minutes</li>
          <li>Plain words are fine. “Not sure yet” is always allowed</li>
          <li>Saved on this device as you go. Nothing is sent</li>
        </ul>
      </header>
      <IntakeWizard />
    </>
  );
}
