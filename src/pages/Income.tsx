import React, { useState } from "react";
import { useGuestStore } from "../store/useGuestStore";
import { v4 as uuidv4 } from "uuid";

export default function Income() {
  const addIncome = useGuestStore((s) => s.addIncome);
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState("");

  const save = () => {
    if (!amount) return;
    addIncome({
      id: uuidv4(),
      amount: Number(amount),
      note,
      date: new Date().toISOString(),
    });
    setAmount("");
    setNote("");
    alert("Income saved");
  };

  return (
    <div className="max-w-md p-2">
      <h1 className="text-2xl font-semibold mb-4">Add Income</h1>

      <div className="space-y-3">
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Amount (AED)"
          value={amount as any}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Note (Room 101 rent)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

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
