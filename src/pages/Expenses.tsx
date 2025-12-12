import React, { useState } from "react";
import { useAddExpenses } from "../utility/addExpenses";
// make sure this hook exists like useAddIncome

export default function Expense() {
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<string>("");
  const [propertyName, setPropertyName] = useState("Majestic Town");
  const [reportType, setReportType] = useState("monthly");

  const { mutate: addExpense } = useAddExpenses();

  const save = () => {
    if (!amount || !date || !propertyName || !reportType) {
      return alert("Please fill all required fields");
    }

    addExpense({
      amount: Number(amount),
      note,
      date,
      propertyName,
      reportType,
    });

    // Reset form after saving
    setAmount("");
    setNote("");
    setDate("");
    setPropertyName("Majestic Town");
    setReportType("monthly");

    alert("Expense saved");
  };

  return (
    <div className="max-w-md p-2">
      <h1 className="text-2xl font-semibold mb-4">Add Expense</h1>

      <div className="space-y-3">
        {/* Amount */}
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Amount (AED)"
          value={amount as any}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        {/* Property Name */}
        <select
          className="w-full border p-2 rounded"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        >
          <option value="Majestic Town">Majestic Town</option>
          <option value="DSV Property">DSV Property</option>
          <option value="Vouge Inn">Vouge Inn</option>
          <option value="GoHaus">GoHaus</option>
        </select>

        {/* Report Type */}
        <select
          className="w-full border p-2 rounded"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="project">Project</option>
        </select>

        {/* Date */}
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Note */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Note (e.g., electricity bill)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Save Button */}
        <button
          onClick={save}
          className="w-full bg-red-600 text-white p-3 rounded-lg"
        >
          Save Expense
        </button>
      </div>
    </div>
  );
}
