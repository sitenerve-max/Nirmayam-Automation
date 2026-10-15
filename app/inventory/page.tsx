import { ApprovalList } from "@/components/ApprovalList";
import { PageHeader, SampleTag, Section, StockStatus } from "@/components/ui";
import { inventory, purchaseRequests, stockMovements } from "@/lib/sample";

export const metadata = { title: "Inventory — Niramayam Care OS" };

export default function Inventory() {
  const low = inventory.filter((i) => i.qty <= i.reorder).length;
  return (
    <>
      <PageHeader
        eyebrow="Module 3 · Inventory"
        title="Know what is running low before it stops a session."
        lead="Equipment and consumables with reorder levels, vendor details and a purchase-request approval step."
      />

      <div className="stats">
        <div className="stat"><span>Tracked items</span><strong>{inventory.length}</strong><SampleTag /></div>
        <div className="stat"><span>At or below reorder level</span><strong>{low}</strong><SampleTag /></div>
        <div className="stat"><span>Purchase requests</span><strong>{purchaseRequests.length}</strong><SampleTag /></div>
      </div>

      <Section title="Stock overview" lead="Sample items and quantities. Status is calculated from stock against the reorder level.">
        <div className="table-wrap">
          <table>
            <caption className="sr-only">Equipment and consumables stock, sample data</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Reorder level</th>
                <th scope="col">Vendor</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i) => (
                <tr key={i.item}>
                  <th scope="row">{i.item}</th>
                  <td>{i.type}</td>
                  <td>{i.qty}</td>
                  <td>{i.reorder}</td>
                  <td>{i.vendor}</td>
                  <td><StockStatus qty={i.qty} reorder={i.reorder} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Purchase requests and movement" lead="Requests are drafted automatically at reorder level and wait for approval. Nothing is ordered.">
        <div className="cards-2 wide-first">
          <ApprovalList
            label="Purchase requests (sample)"
            items={purchaseRequests}
            pendingLabel="Awaiting approval"
            approvedLabel="Approved"
            rejectedLabel="Rejected"
            footnote="Prototype only: approving does not place an order with any vendor."
          />
          <div className="card">
            <div className="card-head">
              <h3>Stock movement history</h3>
              <SampleTag />
            </div>
            <ul className="movements">
              {stockMovements.map((m) => (
                <li key={`${m.date}-${m.item}`}>
                  <span className="mv-date">{m.date}</span>
                  <span><strong>{m.item}</strong> · {m.reason}</span>
                  <b className={m.change.startsWith("+") ? "pos" : "neg"}>{m.change}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
