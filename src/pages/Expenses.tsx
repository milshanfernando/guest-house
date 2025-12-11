import React, { useState } from "react";
import { useGuestStore } from "../store/useGuestStore";
import { v4 as uuidv4 } from "uuid";

export default function Expenses() {
  const addExpense = useGuestStore((s) => s.addExpense);
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState("");

  const save = () => {
    if (!amount) return;
    addExpense({
      id: uuidv4(),
      amount: Number(amount),
      note,
      date: new Date().toISOString(),
    });
    setAmount("");
    setNote("");
    alert("Expense saved");
  };

  return (
    <div className="max-w-md p-2">
      <h1 className="text-2xl font-semibold mb-4">Add Expense</h1>

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
          placeholder="Note (Cleaning, Electricity)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          onClick={save}
          className="w-full bg-red-500 text-white p-3 rounded-lg"
        >
          Save Expense
        </button>
      </div>
    </div>
  );
}
