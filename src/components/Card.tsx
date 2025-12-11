import React from 'react'

export default function Card({ title, value, highlight }: { title: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`p-5 rounded-xl shadow bg-white border ${highlight ? 'border-green-400' : 'border-gray-200'}`}>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  )
}
