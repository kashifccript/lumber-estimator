'use client';
import { CircleProgress } from '@/components/shared/circular-progress';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { EstimatorStat } from '../estimates/types/estimate';
import { EstimatorStats } from '@/components/shared/estimator-stat-card';
import { useEstimatorApis } from '../admin/actions/estimator';
export default function Stats() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<EstimatorStat | null>(null);
  const [loading, setLoading] = useState(true);
  const { getStats } = useEstimatorApis();
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getStats();
      setStats(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [session]);

  return (
    <div className='flex flex-col items-start justify-between gap-6 md:items-center lg:flex-row'>
      <h3 className='text-[48px] leading-[60px] font-normal text-[#1F1F1F]'>
        Overview
      </h3>
      <div className='h-full place-self-center'>
        <CircleProgress percentage={stats?.percentage || 0} />
      </div>
      <div className='flex h-full flex-wrap justify-between gap-3 md:flex-row md:gap-6 lg:flex-nowrap'>
        <div className='h-full w-[48%] lg:w-[23%]'>
          <EstimatorStats
            title='Total Projects'
            value={stats?.total_projects || 0}
            isLoading={loading}
          />
        </div>
        <div className='h-full w-[48%] lg:w-[23%]'>
          <EstimatorStats
            title='Active Estimates'
            value={stats?.active_estimates || 0}
            isLoading={loading}
          />
        </div>
        <div className='h-full w-[48%] lg:w-[23%]'>
          <EstimatorStats
            title='This Month Expense'
            value={stats?.expenses_this_month || 0}
            isLoading={loading}
          />
        </div>
        <div className='h-full w-[48%] lg:w-[23%]'>
          <EstimatorStats
            title='No of Contractor'
            value={stats?.no_of_contractors || 0}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}
