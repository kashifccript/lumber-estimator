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
   <div className="flex flex-col gap-6 py-8 lg:flex-row">
  {/* First div = double width */}
  <div className="flex-[1] h-full">
    <SegmentedProgress value={stats?.percentage || 0} />
  </div>

  {/* Stats container = remaining space */}
  <div className="flex-[3] flex flex-wrap gap-3 md:gap-6">
    <div className="flex-1 min-w-[45%] lg:min-w-[22%]">
      <EstimatorStats
        title="Total Projects"
        value={stats?.total_projects || 0}
        isLoading={loading}
      />
    </div>
    <div className="flex-1 min-w-[45%] lg:min-w-[22%]">
      <EstimatorStats
        title="Active Estimates"
        value={stats?.active_estimates || 0}
        isLoading={loading}
      />
    </div>
    <div className="flex-1 min-w-[45%] lg:min-w-[22%]">
      <EstimatorStats
        title="This Month Expense"
        value={stats?.expenses_this_month || 0}
        isLoading={loading}
      />
    </div>
    <div className="flex-1 min-w-[45%] lg:min-w-[22%]">
      <EstimatorStats
        title="No of Contractor"
        value={stats?.no_of_contractors || 0}
        isLoading={loading}
      />
    </div>
  </div>
</div>
  )

}
