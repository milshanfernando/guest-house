import axios from "axios";
import { IncomeItem } from "../store/useGuestStore";
import { BASE_URL } from "../config";

const client = axios.create({
  baseURL: `${BASE_URL}/income`,
});

export const getIncomeByMonth = async (
  month: string
): Promise<IncomeItem[]> => {
  const { data } = await client.get("/month", {
    params: { _month: month }, // ?_month=2025-01-01
  });

  return data;
};
