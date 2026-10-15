import { ApprovalList } from "@/components/ApprovalList";
import { Badge, Note, PageHeader, SampleTag, Section } from "@/components/ui";
import { leaveRequests, payrollInputs, permissions, roles, staff, type Access } from "@/lib/sample";

export const metadata = { title: "Team operations — Niramayam Care OS" };

const accessBadge: Record<Access, { tone: "ok" | "info" | "muted"; text: string }> = {
  edit: { tone: "ok", text: "Edit" },
  view: { tone: "info", text: "View" },
  none: { tone: "muted", text: "No access" },
};

export default function TeamOperations() {
  const late = staff.filter((s) => s.attendance === "Late mark");
  return (
    <>
      <PageHeader
        eyebrow="Module 2 · Team operations"
        title="Attendance, leave and payroll inputs without the paperwork."
        lead="Check-ins feed shifts, leave approvals and the month-end inputs finance needs."
      />

      {late.length > 0 ? <Note tone="warn"><strong>Late-mark alert (sample):</strong> {late.map((l) => l.name).join(", ")} checked in after the shift start time.</Note> : null}

      <Section title="Today’s attendance" lead="Sample roster for a working day.">
        <div className="table-wrap">
          <table>
            <caption className="sr-only">Staff attendance, sample data</caption>
            <thead>
              <tr>
                <th scope="col">Staff</th>
                <th scope="col">Role</th>
                <th scope="col">Check-in</th>
                <th scope="col">Check-out</th>
                <th scope="col">Shift</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.name}>
                  <th scope="row">{s.name}</th>
                  <td>{s.role}</td>
                  <td>{s.checkIn}</td>
                  <td>{s.checkOut}</td>
                  <td>{s.shift}</td>
                  <td><Badge tone={s.tone}>{s.attendance}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Leave and payroll" lead="Leave is requested in the app and approved by the manager. Approved leave flows into payroll inputs.">
        <div className="cards-2 wide-first">
          <ApprovalList
            label="Leave requests (sample)"
            items={leaveRequests}
            pendingLabel="Pending approval"
            approvedLabel="Leave approved"
            rejectedLabel="Leave rejected"
            footnote="Prototype only: decisions change status in your browser and are not saved."
          />
          <div className="card">
            <div className="card-head">
              <h3>Payroll input summary</h3>
              <SampleTag>Concept</SampleTag>
            </div>
            <dl className="mini">
              {payrollInputs.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd>{p.value}</dd>
                </div>
              ))}
            </dl>
            <p className="muted foot-note">
              <strong>Monthly salary export (concept):</strong> a summary of these inputs for finance to review. This prototype does not calculate any salary amounts.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Role-permission matrix" lead="A proposed starting point. Final permissions are confirmed with Niramayam.">
        <div className="table-wrap">
          <table className="matrix">
            <caption className="sr-only">What each role can view or edit</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                {roles.map((r) => (
                  <th scope="col" key={r}>{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((p) => (
                <tr key={p.area}>
                  <th scope="row">{p.area}</th>
                  {roles.map((r) => (
                    <td key={r}><Badge tone={accessBadge[p.access[r]].tone}>{accessBadge[p.access[r]].text}</Badge></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
