import React from "react";
import Card from "../components/Card";
import { useGuestStore } from "../store/useGuestStore";
import RecordsList from "../components/RecordsList";
import GeneratePDF from "../components/GeneratePDF";

export default function Dashboard() {
  const totalIncome = useGuestStore((s) => s.getTotalIncome());
  const totalExpenses = useGuestStore((s) => s.getTotalExpenses());
  const profit = useGuestStore((s) => s.getProfit());

  return (
    <div className="space-y-6 p-2">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Income (AED)" value={totalIncome} />
        <Card title="Total Expenses (AED)" value={totalExpenses} />
        <Card title="Profit (AED)" value={profit} highlight />
      </div>

      <GeneratePDF />

      <RecordsList />
    </div>
  );
}
