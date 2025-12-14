import React, { useState } from "react";
import Card from "../components/Card";
import UseIncomes from "../utility/useIncomes";
import UseExpenses from "../utility/useExpenses";
import RecordsList from "../components/RecordsList";
import DashboardDaily from "../components/DailyDashboard";
// import GeneratePDF from "../components/GeneratePDF";

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  // ✅ Monthly income
  const {
    data: incomes = [],
    isLoading: isLoadingIncome,
    isError: isErrorIncome,
  } = UseIncomes({
    month: selectedMonth,
    reportType: "monthly",
  });

  // ✅ Monthly expenses
  const {
    data: expenses = [],
    isLoading: isLoadingExpenses,
    isError: isErrorExpenses,
  } = UseExpenses({
    month: selectedMonth,
    reportType: "monthly",
  });

  // Totals
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const profit = totalIncome - totalExpenses;

  const isLoading = isLoadingIncome || isLoadingExpenses;
  const isError = isErrorIncome || isErrorExpenses;

  return (
    <>
      <div className="space-y-6 p-2">
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        {/* Month selector */}
        <div className="mb-4 flex items-center gap-2">
          <label className="font-medium">Select Month:</label>
          <input
            type="month"
            className="border p-2 rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>

        {/* States */}
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
      <hr />
      <DashboardDaily />
    </>
  );
}

// import React, { useState } from "react";
// import Card from "../components/Card";
// import UseIncomes from "../utility/useIncomes";
// import UseExpenses from "../utility/useExpenses";
// import RecordsList from "../components/RecordsList";
// import GeneratePDF from "../components/GeneratePDF";

// export default function Dashboard() {
//   const [selectedMonth, setSelectedMonth] = useState<string>(() => {
//     const today = new Date();
//     // Format YYYY-MM for <input type="month">
//     return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}`;
//   });

//   // Fetch incomes and expenses using React Query
//   const {
//     data: incomes = [],
//     isLoading: isLoadingIncome,
//     isError: isErrorIncome,
//   } = UseIncomes({ month: selectedMonth });

//   const {
//     data: expenses = [],
//     isLoading: isLoadingExpenses,
//     isError: isErrorExpenses,
//   } = UseExpenses({ month: selectedMonth });

//   // Calculate totals
//   const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
//   const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
//   const profit = totalIncome - totalExpenses;

//   // Loading or error state
//   const isLoading = isLoadingIncome || isLoadingExpenses;
//   const isError = isErrorIncome || isErrorExpenses;

//   return (
//     <div className="space-y-6 p-2">
//       <h1 className="text-3xl font-semibold">Dashboard</h1>

//       {/* Month Selector */}
//       <div className="mb-4">
//         <label className="mr-2 font-medium">Select Month:</label>
//         <input
//           type="month"
//           className="border p-2 rounded"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//         />
//       </div>

//       {/* Loading / Error */}
//       {isLoading && <p className="text-gray-500">Loading records...</p>}
//       {isError && (
//         <p className="text-red-500">Failed to load incomes or expenses.</p>
//       )}

//       {!isLoading && !isError && (
//         <>
//           {/* Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <Card title="Total Income (AED)" value={totalIncome} />
//             <Card title="Total Expenses (AED)" value={totalExpenses} />
//             <Card title="Profit (AED)" value={profit} highlight />
//           </div>

//           {/* PDF generation and records list */}
//           {/* <GeneratePDF incomes={incomes} expenses={expenses} /> */}
//           <RecordsList month={selectedMonth} />
//         </>
//       )}
//     </div>
//   );
// }
