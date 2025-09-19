'use client';

import { CustomDropdown } from '@/components/shared/custom-dropdown';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { useContractorApis } from '@/features/admin/actions/contractor';
import { BarChart, Bar, Cell } from 'recharts';

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='rounded-md bg-white px-4 py-2 text-sm shadow-md'>
        <p className='font-semibold'>${payload[0].value.toLocaleString()}</p>
        <p className='text-gray-500'>{payload[0].payload.note}</p>
      </div>
    );
  }
  return null;
};

export default function MonthlyBarChart() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { getContractorMonthlyExpensses } = useContractorApis();

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getContractorMonthlyExpensses();
      setStats(response);
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [session]);

  const months = ['Monthly'];
  const [selectedValue, setSelectedValue] = useState(months[0]);

  const chartData =
    stats?.monthly_revenue?.map((item: any) => ({
      month: item.month,
      value: Number(item.revenue) || 0,
      note: item.note
    })) || [];

  const highlightMonth = useMemo(() => {
    if (!chartData.length) return null;
    const maxEntry = chartData.reduce((prev: any, curr: any) =>
      curr.value > prev.value ? curr : prev
    );
    return maxEntry.month;
  }, [chartData]);
  return (
    <div className='flex h-100 w-full flex-col gap-9'>
      <div className='flex flex-col flex-row gap-6 py-4 justify-between'>
        <div className='text-[20px] font-normal text-[#1F1F1F]'>
          Monthly Revenue
        </div>
        <CustomDropdown
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={months}
        />
      </div>

      <ResponsiveContainer>
        <BarChart data={chartData} barCategoryGap='40%' barGap={8}>
          <XAxis dataKey='month' />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
          <Bar dataKey='value' radius={[8, 8, 0, 0]}>
            {chartData.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.month === highlightMonth ? '#F87171' : 'url(#stripe)'
                }
              />
            ))}
          </Bar>

          {/* Striped pattern */}
          <defs>
            <pattern
              id='stripe'
              patternUnits='userSpaceOnUse'
              width={6}
              height={6}
              patternTransform='rotate(45)'
            >
              <rect
                width='3'
                height='6'
                transform='translate(0,0)'
                fill='#CBD5E1'
              />
            </pattern>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
