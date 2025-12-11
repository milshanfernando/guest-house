"use client";

import React, { useState, useMemo } from "react";

// Types
type Building = {
  id: number;
  name: string;
  rooms: string[];
};

type ElectricityMap = Record<string, Record<string, number>>;

type OtherExpenses = {
  staff: number;
  security: number;
  laundry: number;
  utility: number;
  apartmentRent: number;
};

type SeasonRateMap = {
  winter: number;
  mid: number;
  summer: number;
};

export default function GuestHouseBudgetSystem(): JSX.Element {
  const [buildings, setBuildings] = useState<Building[]>([
    { id: 1, name: "Building No 12", rooms: ["301", "302", "401", "M2", "M3"] },
    { id: 2, name: "DSV Property", rooms: ["M2", "101"] },
  ]);

  const [electricity, setElectricity] = useState<ElectricityMap>({
    "Building No 12": {
      "301": 1200,
      "302": 1200,
      "401": 1200,
      M2: 800,
      M3: 800,
    },
    "DSV Property": { M2: 800, "101": 1200 },
  });

  const [otherExpenses, setOtherExpenses] = useState<OtherExpenses>({
    staff: 8000,
    security: 2000,
    laundry: 6000,
    utility: 3000,
    apartmentRent: 0,
  });

  const [roomCount, setRoomCount] = useState<number>(50);
  const [seasonRates, setSeasonRates] = useState<SeasonRateMap>({
    winter: 180,
    mid: 130,
    summer: 80,
  });
  const [selectedSeason, setSelectedSeason] =
    useState<keyof SeasonRateMap>("winter");

  const [occupancy, setOccupancy] = useState<number>(0.7);

  function updateElectricity(
    buildingName: string,
    roomName: string,
    value: string | number
  ) {
    setElectricity((prev) => ({
      ...prev,
      [buildingName]: {
        ...prev[buildingName],
        [roomName]: Number(value),
      },
    }));
  }

  function updateOtherExpense(key: keyof OtherExpenses, value: string) {
    setOtherExpenses((prev) => ({ ...prev, [key]: Number(value) }));
  }

  // Calculations
  const totalElectricity = useMemo(() => {
    return Object.values(electricity).reduce((bAcc, roomsObj) => {
      return (
        bAcc +
        Object.values(roomsObj).reduce((rAcc, v) => rAcc + Number(v || 0), 0)
      );
    }, 0);
  }, [electricity]);

  const totalOther = useMemo(
    () => Object.values(otherExpenses).reduce((a, b) => a + Number(b || 0), 0),
    [otherExpenses]
  );

  const totalExpenses = totalElectricity + totalOther;

  const dailyRevenueIfFull = roomCount * seasonRates[selectedSeason];
  const dailyRevenueActual = Math.round(dailyRevenueIfFull * occupancy);
  const monthlyRevenue = dailyRevenueActual * 30;
  const monthlyProfit = monthlyRevenue - totalExpenses;

  const breakEvenRoomsPerMonth = Math.ceil(
    totalExpenses / seasonRates[selectedSeason]
  );

  const dailyRoomCost = totalExpenses / 30;
  const costPerRoomPerDay = roomCount > 0 ? dailyRoomCost / roomCount : 0;
  const monthlyRoomCost = roomCount > 0 ? totalExpenses / roomCount : 0;

  async function exportPDF() {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    let y = 40;

    doc.setFontSize(20);
    doc.text("Guest House Budget Report", 40, y);
    y += 30;

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, y);
    y += 30;

    // Building tables
    buildings.forEach((b) => {
      doc.setFontSize(14);
      doc.text(b.name, 40, y);
      y += 10;

      const rows = b.rooms.map((room) => [
        room,
        electricity[b.name]?.[room] || 0,
      ]);

      autoTable(doc, {
        head: [["Room", "Electricity (AED)"]],
        body: rows,
        startY: y,
        theme: "grid",
        styles: { fontSize: 10 },
      });

      // update y correctly
      // @ts-ignore
      y = doc.lastAutoTable.finalY + 20;
      if (y > 700) {
        doc.addPage();
        y = 40;
      }
    });

    doc.addPage();
    y = 40;

    autoTable(doc, {
      head: [["Expense", "Amount"]],
      body: Object.entries(otherExpenses).map(([k, v]) => [
        k.toUpperCase(),
        `AED ${v}`,
      ]),
      startY: y,
      theme: "grid",
    });

    // @ts-ignore
    y = doc.lastAutoTable.finalY + 30;

    autoTable(doc, {
      head: [["Description", "Value"]],
      body: [
        ["Total Electricity", `AED ${totalElectricity}`],
        ["Total Other Expenses", `AED ${totalOther}`],
        ["Total Monthly Expenses", `AED ${totalExpenses}`],
        ["Season", selectedSeason.toUpperCase()],
        ["Season Rate", `AED ${seasonRates[selectedSeason]}`],
        ["Occupancy", `${(occupancy * 100).toFixed(0)}%`],
      ],
      startY: y,
      theme: "striped",
    });

    // Revenue Section
    // @ts-ignore
    y = doc.lastAutoTable.finalY + 30;

    autoTable(doc, {
      head: [["Metric", "Value"]],
      body: [
        ["Daily Revenue (Actual)", `AED ${dailyRevenueActual}`],
        ["Monthly Revenue", `AED ${monthlyRevenue.toLocaleString()}`],
        [
          "Monthly Profit / Loss",
          monthlyProfit >= 0
            ? `+ AED ${monthlyProfit.toLocaleString()}`
            : `- AED ${Math.abs(monthlyProfit).toLocaleString()}`,
        ],
        [
          "Break-even (Rooms/Month)",
          `${breakEvenRoomsPerMonth} (${Math.ceil(
            breakEvenRoomsPerMonth / 30
          )} per day)`,
        ],
        ["Daily Cost / Room", `AED ${costPerRoomPerDay.toFixed(2)}`],
        ["Monthly Cost / Room", `AED ${monthlyRoomCost.toFixed(2)}`],
      ],
      startY: y,
      theme: "grid",
    });

    doc.save("Guest_House_Budget_Report.pdf");
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">
          Guest House Budget System
        </h1>

        <p className="text-sm text-gray-600">
          Expected budget and profit analysis
        </p>
      </header>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BUILDINGS */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-medium mb-3">Buildings & Electricity</h2>

          {buildings.map((b) => (
            <div key={b.id} className="mb-4 border rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <strong>{b.name}</strong>
                <button
                  className="text-xs px-2 py-1 bg-gray-100 rounded"
                  onClick={() =>
                    setBuildings((prev) =>
                      prev.map((x) =>
                        x.id === b.id
                          ? {
                              ...x,
                              rooms: [...x.rooms, `R${x.rooms.length + 1}`],
                            }
                          : x
                      )
                    )
                  }
                >
                  + Add room
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {b.rooms.map((r) => (
                  <div key={r} className="flex flex-col">
                    <label className="text-xs font-bold">{r}</label>
                    <input
                      type="number"
                      value={electricity[b.name]?.[r] || 0}
                      onChange={(e) =>
                        updateElectricity(b.name, r, e.target.value)
                      }
                      className="px-2 py-1 border rounded text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* OTHER EXPENSES */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-medium mb-3">Other Monthly Expenses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(otherExpenses).map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <label className="text-xs font-bold capitalize">
                  {k.replace("_", " ")}
                </label>
                <input
                  type="number"
                  value={v}
                  onChange={(e) =>
                    updateOtherExpense(k as keyof OtherExpenses, e.target.value)
                  }
                  className="px-2 py-1 border rounded text-sm"
                />
              </div>
            ))}
          </div>

          {/* ROOMS */}
          <div className="mt-4">
            <label className="text-xs font-bold">Room Count</label>
            <input
              type="number"
              value={roomCount}
              onChange={(e) => setRoomCount(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm"
            />
          </div>

          {/* RATES */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(seasonRates).map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <label className="text-xs font-bold capitalize">{k}</label>
                <input
                  type="number"
                  value={v}
                  onChange={(e) =>
                    setSeasonRates((prev) => ({
                      ...prev,
                      [k]: Number(e.target.value),
                    }))
                  }
                  className="px-2 py-1 border rounded text-sm"
                />
              </div>
            ))}
          </div>

          {/* SELECT SEASON */}
          <div className="mt-3">
            <label className="text-xs font-bold">Select Season</label>
            <select
              value={selectedSeason}
              onChange={(e) =>
                setSelectedSeason(e.target.value as keyof SeasonRateMap)
              }
              className="px-2 py-1 border rounded text-sm w-full sm:w-auto"
            >
              <option value="winter">Winter</option>
              <option value="mid">Mid</option>
              <option value="summer">Summer</option>
            </select>
          </div>

          {/* OCCUPANCY */}
          <div className="mt-4">
            <label className="text-xs font-bold">
              Occupancy: {(occupancy * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              value={occupancy}
              step="0.01"
              onChange={(e) => setOccupancy(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatBox label="Total Electricity" value={totalElectricity} />
        <StatBox label="Other Expenses" value={totalOther} />
        <StatBox label="Total Monthly Expenses" value={totalExpenses} />

        <div className="p-4 bg-white rounded shadow md:col-span-2">
          <div className="text-sm text-gray-600">
            Monthly Revenue (based on season)
          </div>
          <div className="text-2xl font-semibold">
            AED {monthlyRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            Daily: AED {dailyRevenueActual}
          </div>
        </div>

        <div
          className={`p-4 rounded shadow ${
            monthlyProfit >= 0 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="text-sm text-gray-600">Monthly Profit / (Loss)</div>
          <div
            className={`text-2xl font-semibold ${
              monthlyProfit >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            AED {monthlyProfit.toLocaleString()}
          </div>
          <div className="text-sm">
            Break-even: {breakEvenRoomsPerMonth} (
            {Math.ceil(breakEvenRoomsPerMonth / 30)}/day)
          </div>
        </div>

        {/* COST PER ROOM */}
        <div className="p-4 bg-white rounded shadow md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatBox
            label="Daily Cost/Room"
            value={costPerRoomPerDay.toFixed(2)}
          />
          <StatBox
            label="Monthly Cost/Room"
            value={monthlyRoomCost.toFixed(2)}
          />
        </div>
      </section>

      {/* BUTTONS */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Export PDF
        </button>

        <button
          onClick={() => alert("Extend this if needed")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Placeholder
        </button>
      </div>

      <footer className="mt-6 text-sm text-gray-500">
        Edit values & instantly see live budget breakdown.
      </footer>
    </div>
  );
}

/* Small statistic card component */
function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">
        {typeof value === "number" ? `AED ${value}` : value}
      </div>
    </div>
  );
}
