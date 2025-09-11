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
    <div className='grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-5'>
      <div className='h-full'>
        <CircleProgress percentage={stats?.percentage || 0} />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='Total Projects'
          value={stats?.total_projects || 0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='Active Estimates'
          value={stats?.active_estimates || 0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='This Month Expense'
          value={stats?.expenses_this_month || 0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='No of Contractor'
          value={stats?.no_of_contractors || 0}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
