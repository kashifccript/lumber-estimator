'use client';

import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar
} from 'recharts';
import { useEstimatorApis } from '../admin/actions/estimator';

// ✅ Function to get 10-week range (from today going back 9 weeks)
function getTenWeekRange() {
  const today = new Date();
  const endDate = new Date(today); // today
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 7 * 9); // 10 weeks including current

  return {
    startDate: startDate.toISOString().split('T')[0], // YYYY-MM-DD
    endDate: endDate.toISOString().split('T')[0]
  };
}

export default function WeeklyBarChart() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { weeklyStats } = useEstimatorApis();

  const { startDate, endDate } = getTenWeekRange();

  // Fetch API stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await weeklyStats(startDate, endDate);
      console.log(response,'s')
      setStats(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  // ✅ Transform API response to recharts-friendly format
  const chartData =
    stats?.weekly_accuracy?.map((item: any) => ({
      week: `Week ${item.week_number}`,
      value: item.average_accuracy
    })) || [];

  const options = ['Month'];
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const CustomTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y + 10}
        textAnchor='middle'
        fill='#1F1F1F80'
        fontSize={12}
        fontWeight='400'
      >
        {payload.value}
      </text>
    );
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-row gap-6 py-4 md:justify-between'>
        <div className='text-[20px] font-normal text-[#1F1F1F]'>
          System Estimated Accuracy
        </div>
        <CustomDropdown
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={options}
        />
      </div>

      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={chartData} barCategoryGap='20%'>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis dataKey='week' tick={<CustomTick />} />
          <YAxis />
          <Tooltip />
          <Bar dataKey='value' fill='#E2624B' radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
