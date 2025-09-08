'use client';

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { useState } from 'react';

// Sample data for New User Signups - Last 30 Days
const signupData = [
  { date: '06/01', contractor: 5, estimate: 8 },
  { date: '06/05', contractor: 12, estimate: 15 },
  { date: '06/10', contractor: 18, estimate: 12 },
  { date: '06/15', contractor: 25, estimate: 20 },
  { date: '06/20', contractor: 35, estimate: 18 },
  { date: '06/25', contractor: 28, estimate: 22 },
  { date: '06/30', contractor: 22, estimate: 16 }
];

// Sample data for Monthly Activity
const activityData = [
  { name: 'Estimates Created', value: 140, color: '#3B82F6' },
  { name: 'Quotations Added', value: 70, color: '#3DD598' }
];

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
const months = ['This Month', 'Last Month', 'Next Month'];

export function DashboardCharts() {
  const [selectedValue, setSelectedValue] = useState(months[0]);
  return (
    <div className='flex flex-row justify-between'>
      {/* New User Signups Chart */}
      <Card className='w-full'>
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
          <ChartContainer config={chartConfig} className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={signupData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
                <XAxis
                  dataKey='date'
                  className='fill-muted-foreground text-xs'
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  className='fill-muted-foreground text-xs'
                  axisLine={false}
                  tickLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type='monotone'
                  dataKey='contractor'
                  stroke='#3DD598'
                  strokeWidth={2}
                  dot={false}
                  name='78 Contractor'
                />
                <Line
                  type='monotone'
                  dataKey='estimate'
                  stroke='#3B82F6'
                  strokeWidth={4}
                  dot={false}
                  name='23 Estimate'
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Activity Chart */}
      <Card className='w-full'>
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
        <CardContent>
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
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey='value'
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className='mt-4 flex items-center justify-center gap-6'>

             <div className='flex flex-col items-center gap-2'>
              <div className='text-[24px] font-normal text-[#3b82f6]'>24</div>
              <span className='text-[16px] text-[#737373] font-normal'>Estimates Created</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <div className='text-[24px] font-normal text-[#3DD598]'>24</div>
              <span className='text-[16px] text-[#737373] font-normal'>Quotations Added</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
