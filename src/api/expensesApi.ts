import axios from "axios";
import { ExpenseItem } from "../store/useGuestStore";
import { BASE_URL } from "../config";

const client = axios.create({
  baseURL: `${BASE_URL}/expenses`,
});

export const getExpensesByMonth = async (
  month: string
): Promise<ExpenseItem[]> => {
  const { data } = await client.get("/month", {
    params: { _month: month }, // ?_month=2025-01-01
  });

  return data;
};
