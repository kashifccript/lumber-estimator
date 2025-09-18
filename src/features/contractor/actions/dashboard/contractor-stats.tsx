'use client';
import { SegmentedProgress } from '@/components/shared/circular-progress';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { EstimatorStats } from '@/components/shared/estimator-stat-card';
import { useContractorApis } from '@/features/admin/actions/contractor';
import { ContractorDashboardStats } from '@/features/admin/types/contractor';
export default function ContractorStats() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<ContractorDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { getContractorDashboardOveriview } = useContractorApis();
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getContractorDashboardOveriview();
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
        <SegmentedProgress value={stats?.approval_percentage || 0} />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='Approved Project'
          value={stats?.approved_projects || 0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='Pending Approvals'
          value={stats?.pending_approvals || 0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='Active Project Value'
          value={stats?.active_project_value || 0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='Quotation Items'
          value={stats?.quotation_items || 0}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
