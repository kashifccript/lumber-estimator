'use client';

import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { useEffect, useState } from 'react';
import { useUserApis } from '../../actions/users';

const chartConfig = {
  contractor: {
    label: 'Contractor',
    color: '#3B82F6'
  },
  estimate: {
    label: 'Estimator',
    color: '#10B981'
  }
};

const months = ['This Month'];

const getCurrentMonthDateRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const startDate = new Date(year, month, 1);
  const endDate = now;
  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return {
    start_date: formatDate(startDate),
    end_date: formatDate(endDate)
  };
};

export function NewSignupStats() {
  const [selectedValue, setSelectedValue] = useState(months[0]);
  const [contractorStats, setContractorStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const { start_date, end_date } = getCurrentMonthDateRange();
  const { estimatorContractor } = useUserApis();

  const fetchEstimatorContractor = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await estimatorContractor(start_date, end_date);

      setContractorStats(response);
    } catch (error) {
      console.error('Error fetching estimator contractor:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchEstimatorContractor();
      setLoading(false);
    };

    fetchData();
  }, [selectedValue]); // Added selectedValue dependency

  const signupData = contractorStats?.periods
    ? contractorStats.periods.map((period: any, index: number) => {
        const date = new Date(period.date);
        return {
          date: date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit'
          }),
          contractor: period.contractor,
          estimate: period.estimator,
          period: `Period ${index + 1}`
        };
      })
    : [];

  if (loading) {
    return (
      <Card className='w-full'>
        <CardContent className='flex h-[400px] items-center justify-center'>
          <div className='text-muted-foreground'>Loading charts...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full border-0 shadow-0'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div>
          <CardTitle className='text-[20px] font-normal text-[#0C0C0C]'>
            New User Signups - Last 30 Days
          </CardTitle>
        </div>
        <CustomDropdown
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={months}
        />
      </CardHeader>
      <CardContent className='w-full'>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <ResponsiveContainer width='full' height='100%'>
            <LineChart
              data={signupData}
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey='date'
                className='fill-muted-foreground text-xs'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                interval='preserveStartEnd'
              />
              <YAxis
                className='fill-muted-foreground text-xs'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 50]}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) => `${value}`}
              />
              <Line
                type='monotone'
                dataKey='contractor'
                stroke='#3B82F6'
                strokeWidth={4}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: '#3B82F6',
                  strokeWidth: 2,
                  fill: '#3B82F6'
                }}
                name='Contractor'
              />
              <Line
                type='monotone'
                dataKey='estimate'
                stroke='#10B981'
                strokeWidth={4}
                activeDot={{
                  r: 5,
                  stroke: '#10B981',
                  strokeWidth: 2,
                  fill: '#10B981'
                }}
                name='Estimator'
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
