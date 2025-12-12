import React from "react";
import { IncomeItem } from "../store/useGuestStore";
import UseIncomes from "../utility/useIncomes";

interface Props {
  month: string; // pass selected month YYYY-MM-DD
}

const Incomes: React.FC<Props> = ({ month }) => {
  const { data: income = [], isLoading, isError } = UseIncomes({ month });

  if (isLoading) {
    return <p className="text-gray-500">Loading income records...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load income records.</p>;
  }

  return (
    <div className="bg-white p-4 shadow rounded-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-3">Income Records</h2>

      {income.length === 0 ? (
        <p className="text-gray-400 text-sm">No income records.</p>
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
            {income.map((i: IncomeItem, index: number) => (
              <tr key={index || i.date}>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(i.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  AED {i.amount}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {i.note || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Incomes;
