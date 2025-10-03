'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useContractorApis } from '@/features/admin/actions/contractor';
import { CustomDropdown } from '@/components/shared/custom-dropdown';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='rounded bg-white p-2 text-sm shadow'>
        <p className='font-semibold'>{label}</p>
        <p className='text-blue-500'>
          Revenue: ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function CostLineChart() {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getContractorMonthlyExpensses } = useContractorApis();

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getContractorMonthlyExpensses();

      // Assuming your API response looks like the JSON you pasted
      const formattedData = response?.monthly_revenue?.map((item: any) => ({
        month: item.month,
        revenue: item.revenue
      }));

      setChartData(formattedData || []);
    } catch (error) {
      console.error('Error fetching contractor dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);
  const months = ['This Month'];
  const [selectedValue, setSelectedValue] = useState(months[0]);
  return (
    <div className='flex w-full flex-col bg-white rounded-lg p-3'>
      <div className='flex flex-row gap-6 py-4 justify-between'>
        <div className='text-[20px] font-normal text-[#1F1F1F]'>
          <span className='block lg:hidden'>Estimate Cost</span>
          <span className='hidden lg:block'>Actual Cost Estimated Cost</span>
        </div>
        <CustomDropdown
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={months}
        />
      </div>

      <div className='h-72 w-full'>
        {loading ? (
          <p className='text-center text-gray-500'>Loading chart...</p>
        ) : (
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey='month' />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type='monotone'
                dataKey='revenue'
                stroke='#3b82f6'
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
