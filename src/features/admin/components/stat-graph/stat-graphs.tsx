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
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUserApis } from '../../actions/users';
import {
  Estimator_Contractor,
  Estimattes_QuotationStats
} from '../../types/user';

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

  // First day of current month
  const startDate = new Date(year, month, 1);
  // Current date
  const endDate = now;

  // Format as YYYY-MM-DD in local time
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
  const { data: session } = useSession();

  const { estimatesQuotation, estimatorContractor } = useUserApis();

  const [contractorStats, setContractorStats] =
    useState<Estimator_Contractor | null>(null);
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

  const fetchEstimatorContractor = async () => {
    try {
      const response = await estimatorContractor(start_date, end_date);
      setContractorStats(response);
    } catch (error) {
      console.error('Error fetching estimator contractor:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchEstimatorContractor(),
        fetchEstimatesQuotation()
      ]);
      setLoading(false);
    };

    fetchData();
  }, [session]);

  const signupData = contractorStats
    ? [
        {
          date: 'Current Month',
          contractor: contractorStats.contractors || 0,
          estimate: contractorStats.estimators || 0
        }
      ]
    : [];

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
    <div className='flex flex-row justify-between gap-6'>
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
                  name={`${contractorStats?.contractors || 0} Contractor`}
                />
                <Line
                  type='monotone'
                  dataKey='estimate'
                  stroke='#3B82F6'
                  strokeWidth={4}
                  dot={false}
                  name={`${contractorStats?.estimators || 0} Estimator`}
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
              <div className='text-[24px] font-normal text-[#3b82f6]'>
                {quotationStats?.projects_created || 0}
              </div>
              <span className='text-[16px] font-normal text-[#737373]'>
                Projects Created
              </span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <div className='text-[24px] font-normal text-[#3DD598]'>
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
