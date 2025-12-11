import React from "react";
import { useGuestStore } from "../store/useGuestStore";

export default function RecordsList() {
  const income = useGuestStore((s) => s.income);
  const expenses = useGuestStore((s) => s.expenses);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Income Records */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Income Records</h2>
        <ul className="space-y-2">
          {income.map((i) => (
            <li
              key={i.id}
              className="flex justify-between border p-2 rounded text-sm"
            >
              <span>{i.date}</span>
              <span>AED {i.amount}</span>
              <span>{i.note}</span>
            </li>
          ))}

          {income.length === 0 && (
            <p className="text-gray-400 text-sm">No income records.</p>
          )}
        </ul>
      </div>

      {/* Expense Records */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Expense Records</h2>
        <ul className="space-y-2">
          {expenses.map((e) => (
            <li
              key={e.id}
              className="flex justify-between border p-2 rounded text-sm"
            >
              <span>{e.date}</span>
              <span>AED {e.amount}</span>
              <span>{e.note}</span>
            </li>
          ))}

          {expenses.length === 0 && (
            <p className="text-gray-400 text-sm">No expense records.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
