import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IncomeItem } from "../store/useGuestStore";
import { BASE_URL } from "../config";

export const useAddIncome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newIncome: IncomeItem) => {
      const { data } = await axios.post(`${BASE_URL}/income/create`, newIncome);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
    },
  });
};
