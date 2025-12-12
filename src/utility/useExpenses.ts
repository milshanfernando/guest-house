import { useQuery } from "@tanstack/react-query";
import { ExpenseItem } from "../store/useGuestStore";
import { getExpensesByMonth } from "../api/expensesApi";

interface ItemQuery {
  month: string; // YYYY-MM-DD
}

const UseExpenses = (query: ItemQuery) => {
  return useQuery<ExpenseItem[], Error>({
    queryKey: ["expenses", query.month],
    queryFn: async () => {
      const res = await getExpensesByMonth(query.month);
      // ensure we always return an array
      return Array.isArray(res) ? res : [];
    },
    enabled: !!query.month,
    placeholderData: [],
  });
};

export default UseExpenses;
