import React from "react";
import { jsPDF } from "jspdf";
import { useGuestStore } from "../store/useGuestStore";
import type { IncomeItem, ExpenseItem } from "../store/useGuestStore";

export default function GeneratePDF() {
  const income = useGuestStore((s) => s.income);
  const expenses = useGuestStore((s) => s.expenses);
  const totalIncome = useGuestStore((s) => s.getTotalIncome());
  const totalExpenses = useGuestStore((s) => s.getTotalExpenses());
  const profit = useGuestStore((s) => s.getProfit());

  const downloadPDF = () => {
    const pdf = new jsPDF();
    let y = 10;

    pdf.setFontSize(18);
    pdf.text("Guest House Financial Report", 10, y);
    y += 12;

    pdf.setFontSize(12);
    pdf.text(`Total Income: AED ${totalIncome}`, 10, y);
    y += 6;
    pdf.text(`Total Expenses: AED ${totalExpenses}`, 10, y);
    y += 6;
    pdf.text(`Profit: AED ${profit}`, 10, y);
    y += 12;

    pdf.setFontSize(14);
    pdf.text("Income Records", 10, y);
    y += 8;

    pdf.setFontSize(11);
    income.forEach((i: IncomeItem) => {
      pdf.text(`${i.date} - AED ${i.amount} - ${i.note ?? ""}`, 10, y);
      y += 6;
    });

    y += 10;

    pdf.setFontSize(14);
    pdf.text("Expense Records", 10, y);
    y += 8;

    pdf.setFontSize(11);
    expenses.forEach((e: ExpenseItem) => {
      pdf.text(`${e.date} - AED ${e.amount} - ${e.note ?? ""}`, 10, y);
      y += 6;
    });

    pdf.save("Report.pdf");
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
}
