import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  FiHome,
  FiDollarSign,
  FiUser,
  FiCreditCard,
  FiSettings,
} from "react-icons/fi";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import GuestHouseBudgetSystem from "./pages/Budjet";

export default function App() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/", icon: <FiHome /> },
    { name: "Budget", path: "/budget", icon: <FiDollarSign /> },
    // { name: "Rooms", path: "/rooms", icon: <FiUser /> },
    { name: "Add Income", path: "/income", icon: <FiCreditCard /> },
    { name: "Add Expense", path: "/expenses", icon: <FiSettings /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between z-20 shadow-md">
        <h1 className="text-xl font-bold tracking-wide">Majestic Town</h1>
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white transition-transform duration-300"></span>
            <span className="block w-6 h-0.5 bg-white transition-transform duration-300"></span>
            <span className="block w-6 h-0.5 bg-white transition-transform duration-300"></span>
          </div>
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full md:h-dvh w-64 bg-gray-900 text-white p-6 z-30
          transform lg:translate-x-0 transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        {/* CLOSE BUTTON MOBILE */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-2xl hover:text-gray-300 transition"
          >
            ✕
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8 hidden lg:block text-center tracking-wider">
          GuestHouse
        </h1>

        <nav className="space-y-3 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-yellow-400 transition-all duration-300 shadow-sm"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* LOGO AT BOTTOM CENTER */}
        <div className="mt-auto flex justify-center pt-6">
          <img
            src="/majestic-town.png"
            alt="Logo"
            className="w-24 h-auto rounded-full shadow-lg opacity-90 hover:opacity-100 transition"
          />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:p-8 pt-24 lg:pt-8 transition-all duration-300 h-dvh overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/budget" element={<GuestHouseBudgetSystem />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </main>
    </div>
  );
}
