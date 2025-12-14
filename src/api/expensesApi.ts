import axios from "axios";
import { ExpenseItem } from "../store/useGuestStore";
import { BASE_URL } from "../config";

const client = axios.create({
  baseURL: `${BASE_URL}/expenses`,
});

export interface ExpenseQueryParams {
  date?: string;
  month?: string; // YYYY-MM
  startMonth?: string; // YYYY-MM
  endMonth?: string; // YYYY-MM
  propertyName?: string; // "A,B,C"
  reportType?: "monthly" | "project";
}

export const getExpenses = async (
  params: ExpenseQueryParams
): Promise<ExpenseItem[]> => {
  const { data } = await client.get("/", { params });
  return Array.isArray(data) ? data : [];
};

// import axios from "axios";
// import { ExpenseItem } from "../store/useGuestStore";
// import { BASE_URL } from "../config";

// const client = axios.create({
//   baseURL: `${BASE_URL}/expenses`,
// });

// export const getExpensesByMonth = async (
//   month: string
// ): Promise<ExpenseItem[]> => {
//   const { data } = await client.get("/month", {
//     params: { _month: month }, // ?_month=2025-01-01
//   });

//   return data;
// };
