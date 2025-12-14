import React, { useState } from "react";
import { useAddIncome } from "../utility/addIncome";

export default function Income() {
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<string>("");
  const [propertyName, setPropertyName] = useState("Majestic Town");
  const [reportType, setReportType] = useState("monthly");

  const { mutate: addIncome } = useAddIncome();

  const save = () => {
    if (!amount || !date || !propertyName || !reportType) {
      return alert("Please fill all required fields");
    }

    addIncome({
      amount: Number(amount),
      note,
      date,
      propertyName,
      reportType,
    });

    setAmount("");
    setNote("");
    setDate("");
    setPropertyName("Majestic Town");
    setReportType("monthly");

    alert("Income saved");
  };

  return (
    <div className="max-w-md p-2">
      <h1 className="text-2xl font-semibold mb-4">Add Income</h1>

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

        {/* Property Name (Dropdown) */}
        <select
          className="w-full border p-2 rounded"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        >
          <option value="Majestic Town 302">Majestic Town 302</option>
          <option value="Majestic Town 401">Majestic Town 401</option>
          <option value="DSV Property M2">DSV Property M2</option>
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
          placeholder="Note (Room 101 rent)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={save}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Save Income
        </button>
      </div>
    </div>
  );
}
