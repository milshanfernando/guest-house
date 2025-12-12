import { useQuery } from "@tanstack/react-query";
import { IncomeItem } from "../store/useGuestStore";
import { getIncomeByMonth } from "../api/incomeApi";

interface ItemQuery {
  month: string; // YYYY-MM-DD
}

const UseIncomes = (query: ItemQuery) => {
  return useQuery<IncomeItem[], Error>({
    queryKey: ["income", query.month],
    queryFn: async () => {
      const res = await getIncomeByMonth(query.month);
      // ensure we always return an array
      return Array.isArray(res) ? res : [];
    },
    enabled: !!query.month,
    placeholderData: [],
  });
};

export default UseIncomes;
