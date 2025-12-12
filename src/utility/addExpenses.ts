import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ExpenseItem } from "../store/useGuestStore";
import { BASE_URL } from "../config";

export const useAddExpenses = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newExpenses: ExpenseItem) => {
      const { data } = await axios.post(
        `${BASE_URL}/expenses/create`,
        newExpenses
      );
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
