import React, { useState } from "react";
import Card from "../components/Card";
import UseIncomes from "../utility/useIncomes";
import UseExpenses from "../utility/useExpenses";
import RecordsList from "../components/RecordsList";

export default function DashboardDaily() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    // Format YYYY-MM-DD for <input type="date">
    return today.toISOString().split("T")[0];
  });

  // ✅ Daily income
  const {
    data: incomes = [],
    isLoading: isLoadingIncome,
    isError: isErrorIncome,
  } = UseIncomes({
    date: selectedDate,
  });

  // ✅ Daily expenses
  const {
    data: expenses = [],
    isLoading: isLoadingExpenses,
    isError: isErrorExpenses,
  } = UseExpenses({
    date: selectedDate,
  });

  // Totals
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const profit = totalIncome - totalExpenses;

  const isLoading = isLoadingIncome || isLoadingExpenses;
  const isError = isErrorIncome || isErrorExpenses;

  return (
    <div className="space-y-6 p-2">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* Date selector */}
      <div className="mb-4 flex items-center gap-2">
        <label className="font-medium">Select Date:</label>
        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Loading / Error */}
      {isLoading && <p className="text-gray-500">Loading records...</p>}
      {isError && (
        <p className="text-red-500">Failed to load incomes or expenses.</p>
      )}

      {!isLoading && !isError && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card title="Total Income (AED)" value={totalIncome} />
            <Card title="Total Expenses (AED)" value={totalExpenses} />
            <Card title="Profit (AED)" value={profit} highlight />
          </div>

          {/* Records */}
          <RecordsList income={incomes} expenses={expenses} />
        </>
      )}
    </div>
  );
}
