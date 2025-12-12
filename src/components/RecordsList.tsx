import React, { useState } from "react";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
interface Props {
  month: string; // pass selected month YYYY-MM-DD
}
const RecordsList: React.FC<Props> = ({ month }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(month);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="mt-10">
      {/* Month Selector */}
      {/* <div className="mb-6 flex items-center gap-4">
        <label htmlFor="month" className="font-medium">
          Select Month:
        </label>
        <input
          type="month"
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border rounded p-2"
        />
      </div> */}

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Income Records */}
        <Incomes month={`${month}-01`} /> {/* append day for API */}
        {/* Expense Records */}
        <Expenses month={`${month}-01`} />
        {/* <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Expense Records</h2>
          <p className="text-gray-400 text-sm">No expense records.</p>
        </div> */}
      </div>
    </div>
  );
};
export default RecordsList;
