import axios from "axios";
import { IncomeItem } from "../store/useGuestStore";
import { BASE_URL } from "../config";

const client = axios.create({
  baseURL: `${BASE_URL}/income`,
});

export interface IncomeQueryParams {
  date?: string;
  month?: string; // YYYY-MM
  startMonth?: string; // YYYY-MM
  endMonth?: string; // YYYY-MM
  propertyName?: string; // "A,B,C"
  reportType?: "monthly" | "project";
}

export const getIncome = async (
  params: IncomeQueryParams
): Promise<IncomeItem[]> => {
  const { data } = await client.get("/", { params });
  return Array.isArray(data) ? data : [];
};

// import axios from "axios";
// import { IncomeItem } from "../store/useGuestStore";
// import { BASE_URL } from "../config";

// const client = axios.create({
//   baseURL: `${BASE_URL}/income`,
// });

// export const getIncomeByMonth = async (
//   month: string
// ): Promise<IncomeItem[]> => {
//   const { data } = await client.get("/month", {
//     params: { _month: month }, // ?_month=2025-01-01
//   });

//   return data;
// };
