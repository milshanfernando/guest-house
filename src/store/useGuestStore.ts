import { create } from "zustand";

export type IncomeItem = {
  id: string;
  amount: number;
  note?: string;
  date: string;
};
export type ExpenseItem = {
  id: string;
  amount: number;
  note?: string;
  date: string;
};
export type Room = {
  id: number;
  roomNumber: number;
  price: number;
  isBooked: boolean;
};

type State = {
  rooms: Room[];
  income: IncomeItem[];
  expenses: ExpenseItem[];
  addIncome: (item: IncomeItem) => void;
  addExpense: (item: ExpenseItem) => void;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getProfit: () => number;
};

export const useGuestStore = create<State>((set, get) => ({
  rooms: [
    { id: 1, roomNumber: 101, price: 600, isBooked: false },
    { id: 2, roomNumber: 102, price: 600, isBooked: false },
    { id: 3, roomNumber: 103, price: 600, isBooked: false },
  ],
  income: [],
  expenses: [],
  addIncome: (item) => set({ income: [...get().income, item] }),
  addExpense: (item) => set({ expenses: [...get().expenses, item] }),
  getTotalIncome: () => get().income.reduce((s, i) => s + Number(i.amount), 0),
  getTotalExpenses: () =>
    get().expenses.reduce((s, e) => s + Number(e.amount), 0),
  getProfit: () => get().getTotalIncome() - get().getTotalExpenses(),
}));
