'use client';
import { SegmentedProgress } from '@/components/shared/circular-progress';
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
    <div className='flex flex-col justify-between gap-4 py-8 lg:flex-row lg:gap-20'>
      {/* First div = double width */}
      <div className='h-full flex-[1]'>
        <SegmentedProgress value={stats?.percentage || 0} />
      </div>

      {/* Stats container = remaining space */}
      <div className='flex flex-[3] flex-wrap gap-3 md:gap-6'>
        <div className='min-w-[45%] flex-1 lg:min-w-[22%]'>
          <EstimatorStats
            title='Total Projects'
            value={stats?.total_projects || 0}
            isLoading={loading}
          />
        </div>
        <div className='min-w-[45%] flex-1 lg:min-w-[22%]'>
          <EstimatorStats
            title='Active Estimates'
            value={stats?.active_estimates || 0}
            isLoading={loading}
          />
        </div>
        <div className='min-w-[45%] flex-1 lg:min-w-[22%]'>
          <EstimatorStats
            title='This Month Expense'
            value={stats?.expenses_this_month || 0}
            isLoading={loading}
          />
        </div>
        <div className='min-w-[45%] flex-1 lg:min-w-[22%]'>
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
