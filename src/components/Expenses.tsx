import React from "react";
import { ExpenseItem } from "../store/useGuestStore";
import UseExpenses from "../utility/useExpenses";

interface Props {
  data: ExpenseItem[]; // pass selected month YYYY-MM-DD
}

const Expenses: React.FC<Props> = ({ data }) => {
  // const { data: expenses = [], isLoading, isError } = UseExpenses({ month });

  // if (isLoading) {
  //   return <p className="text-gray-500">Loading expense records...</p>;
  // }

  // if (isError) {
  //   return <p className="text-red-500">Failed to load expense records.</p>;
  // }

  return (
    <div className="bg-white p-4 shadow rounded-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-3">Expense Records</h2>

      {data.length === 0 ? (
        <p className="text-gray-400 text-sm">No expense records.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Note
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((e: ExpenseItem, index: number) => (
              <tr key={index || e.date}>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  AED {e.amount}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {e.note || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Expenses;
