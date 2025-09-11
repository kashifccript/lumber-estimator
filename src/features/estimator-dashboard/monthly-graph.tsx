"use client";

import { CustomDropdown } from "@/components/shared/custom-dropdown";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 900 },
  { month: "Mar", value: 1500 },
  { month: "Apr", value: 600 },
  { month: "May", value: 1700 },
  { month: "Jun", value: 1000 },
  { month: "Jul", value: 2345 }, // highlighted
  { month: "Aug", value: 1400 },
  { month: "Sep", value: 800 },
  { month: "Oct", value: 1900 },
  { month: "Nov", value: 1100 },
  { month: "Dec", value: 900 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md px-4 py-2 rounded-md text-sm">
        <p className="font-semibold">${payload[0].value.toLocaleString()}</p>
        <p className="text-gray-500">Increased in the last 6 months</p>
      </div>
    );
  }
  return null;
};

export default function MonthlyBarChart() {
  const [highlightMonth] = useState("Jul");
  const months = ['Month'];
  const [selectedValue, setSelectedValue] = useState(months[0]);
  return (
    <div className="w-full flex h-100 flex-col gap-9">
         <div className='flex flex-col flex-row gap-6 py-4 md:justify-between'>
                <div className='text-[20px] font-normal text-[#1F1F1F]'>
                Total Expenses
                </div>
                <CustomDropdown
                  value={selectedValue}
                  onValueChange={setSelectedValue}
                  options={months}
                />
              </div>
      <ResponsiveContainer>
        <BarChart
          data={data}
          barCategoryGap="40%" // space between bars
          barGap={8} // extra spacing if multiple bars
        >
          <XAxis dataKey="month" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.month === highlightMonth ? "#F87171" : "url(#stripe)"}
              />
            ))}
          </Bar>

          {/* Striped pattern for inactive months */}
          <defs>
            <pattern
              id="stripe"
              patternUnits="userSpaceOnUse"
              width={6}
              height={6}
              patternTransform="rotate(45)"
            >
              <rect width="3" height="6" transform="translate(0,0)" fill="#CBD5E1" />
            </pattern>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
