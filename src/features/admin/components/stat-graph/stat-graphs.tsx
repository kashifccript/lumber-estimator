'use client';

import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { useEffect, useState } from 'react';
import { useUserApis } from '../../actions/users';
import type { Estimattes_QuotationStats } from '../../types/user';
import { NewSignupStats } from './new-signup';

const chartConfig = {
  contractor: {
    label: 'Contractor',
    color: '#3B82F6'
  },
  estimate: {
    label: 'Estimate',
    color: '#3DD598'
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

export function DashboardCharts() {
  const [selectedValue, setSelectedValue] = useState(months[0]);

  const { estimatesQuotation } = useUserApis();

  const [quotationStats, setQuotationStats] =
    useState<Estimattes_QuotationStats | null>(null);
  const [loading, setLoading] = useState(true);

  const { start_date, end_date } = getCurrentMonthDateRange();

  const fetchEstimatesQuotation = async () => {
    try {
      const response = await estimatesQuotation(start_date, end_date);
      setQuotationStats(response);
    } catch (error) {
      console.error('Error fetching estimates quotation:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchEstimatesQuotation()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const activityData = quotationStats
    ? [
        {
          name: 'Projects Created',
          value: quotationStats.projects_created || 0,
          color: '#3B82F6'
        },
        {
          name: 'Quotations Created',
          value: quotationStats.quotations_created || 0,
          color: '#3DD598'
        }
      ]
    : [];

  if (loading) {
    return (
      <div className='flex flex-row justify-between gap-6'>
        <Card className='w-full'>
          <CardContent className='flex h-[400px] items-center justify-center'>
            <div className='text-muted-foreground'>Loading charts...</div>
          </CardContent>
        </Card>
        <Card className='w-full'>
          <CardContent className='flex h-[400px] items-center justify-center'>
            <div className='text-muted-foreground'>Loading charts...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3 xl:flex-row '>
      <NewSignupStats />

      <Card className='w-full bg-white'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <div>
            <CardTitle className='text-[20px] font-normal text-[#1F1F1F]'>
              Monthly Activity
            </CardTitle>
          </div>
          <CustomDropdown
            value={selectedValue}
            onValueChange={setSelectedValue}
            options={months}
          />
        </CardHeader>
        <CardContent className='bg-background rounded-lg py-3'>
          <div className='flex items-center justify-center'>
            <ChartContainer
              config={chartConfig}
              className='h-[300px] w-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={activityData}
                    cx='50%'
                    cy='50%'
                    innerRadius={90}
                    outerRadius={110}
                    dataKey='value'
                    cornerRadius={12}
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  {/* ✅ Custom Tooltip */}
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className='rounded-md border bg-white p-2 shadow-md'>
                            {payload.map((entry: any, index: number) => (
                              <div
                                key={`item-${index}`}
                                className='flex items-center gap-2'
                              >
                                <span
                                  className='h-2 w-2 rounded-full'
                                  style={{
                                    backgroundColor: entry.payload.color
                                  }}
                                />
                                <span
                                  className={`text-[14px] font-medium`}
                                  style={{ color: entry.payload.color }}
                                >
                                  {entry.name}: {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className='mt-4 flex items-center justify-center gap-6'>
            <div className='flex flex-col items-center gap-2'>
              <div className='text-[24px] font-normal text-[#3b82f6]'>
                {quotationStats?.projects_created || 0}
              </div>
              <span className='text-[16px] font-normal text-[#737373]'>
                Projects Created
              </span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <div className='text-[24px] font-normal text-[#16a34a]'>
                {quotationStats?.quotations_created || 0}
              </div>
              <span className='text-[16px] font-normal text-[#737373]'>
                Quotations Created
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
