import React from "react";
import { useGuestStore } from "../store/useGuestStore";

export default function Rooms() {
  const rooms = useGuestStore((s) => s.rooms);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
      {rooms.map((r) => (
        <div key={r.id} className="p-4 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-semibold">Room {r.roomNumber}</h2>
          <p className="text-gray-600">Price: AED {r.price}</p>
          <p
            className={`mt-3 font-semibold ${
              r.isBooked ? "text-red-500" : "text-green-600"
            }`}
          >
            {r.isBooked ? "Occupied" : "Available"}
          </p>
        </div>
      ))}
    </div>
  );
}
