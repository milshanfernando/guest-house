import { useQuery } from "@tanstack/react-query";
import { IncomeItem } from "../store/useGuestStore";
import { getIncome, IncomeQueryParams } from "../api/incomeApi";

const UseIncomes = (query: IncomeQueryParams) => {
  return useQuery<IncomeItem[], Error>({
    queryKey: ["income", query],
    queryFn: () => getIncome(query),
    enabled: Object.keys(query).length > 0,
    placeholderData: [],
  });
};

export default UseIncomes;

// import { useQuery } from "@tanstack/react-query";
// import { IncomeItem } from "../store/useGuestStore";
// import { getIncomeByMonth } from "../api/incomeApi";

// interface ItemQuery {
//   month: string; // YYYY-MM-DD
// }

// const UseIncomes = (query: ItemQuery) => {
//   return useQuery<IncomeItem[], Error>({
//     queryKey: ["income", query.month],
//     queryFn: async () => {
//       const res = await getIncomeByMonth(query.month);
//       // ensure we always return an array
//       return Array.isArray(res) ? res : [];
//     },
//     enabled: !!query.month,
//     placeholderData: [],
//   });
// };

// export default UseIncomes;
