'use client';

import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  ErrorBar
} from 'recharts';

const data = [
  { week: 'Week 1', open: 20, close: 30, low: 10, high: 40 },
  { week: 'Week 2', open: 25, close: 45, low: 15, high: 50 },
  { week: 'Week 3', open: 15, close: 30, low: 5, high: 35 },
  { week: 'Week 4', open: 25, close: 35, low: 20, high: 40 },
  { week: 'Week 5', open: 20, close: 45, low: 10, high: 55 },
  { week: 'Week 6', open: 30, close: 35, low: 25, high: 45 },
  { week: 'Week 7', open: 20, close: 45, low: 10, high: 50 },
  { week: 'Week 8', open: 10, close: 25, low: 5, high: 35 },
  { week: 'Week 9', open: 20, close: 30, low: 15, high: 40 },
  { week: 'Week 10', open: 25, close: 35, low: 20, high: 45 }
];

export default function CandlestickChart() {
  const months = ['Month'];
  const [selectedValue, setSelectedValue] = useState(months[0]);
const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      fill="#1F1F1F80"
      fontSize={12}
      fontWeight="400"
    //   style={{ fontFamily: "sans-serif" }}
    >
      {payload.value}
    </text>
  );
};
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-col flex-row gap-6 py-4 md:justify-between'>
        <div className='text-[20px] font-normal text-[#1F1F1F]'>
        System Estimated Accuracy
        </div>
        <CustomDropdown
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={months}
        />
      </div>
     <ResponsiveContainer>
        <ComposedChart data={data}>
          {/* Only vertical grid lines */}
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />

          <XAxis dataKey="week" tick={<CustomTick />} />
          <YAxis />
          <Tooltip />

          {/* Candle body with rounded corners */}
          <Bar
            dataKey={(d) => Math.abs(d.open - d.close)}
            fill="#E2624B"
            barSize={32}
            radius={[8, 8, 8, 8]}
          >
            {/* Whiskers */}
            <ErrorBar
              dataKey="close"
              width={0}
              stroke="1F1F1F80"
              
              strokeWidth={2}
              direction="y"
              data={data.map((d) => ({
                x: d.week,
                low: d.low,
                high: d.high,
              }))}
            />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
