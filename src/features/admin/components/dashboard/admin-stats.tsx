'use client';
import { StatCard } from '@/components/shared/stat-card';
import { useSession } from 'next-auth/react';
import { useUserApis } from '../../actions/users';
import { useEffect, useState } from 'react';
import { StatsCard } from '../../types/user';

export default function AdminStats() {
  const { data: session } = useSession();
  const { getStats } = useUserApis();
  const [stats, setStats] = useState<StatsCard | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getStats();
      console.log(response, 'data');
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
    <div className='grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-4'>
      <div className='h-full'>
        <StatCard
          title='Pending Request'
          value={stats?.pending_requests || 0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <StatCard
          title='Total Active Users'
          value={stats?.total_active_users || 0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <StatCard
          title='Estimates Created'
          value={stats?.estimates_created_this_month || 0}
          subtitle='(This month)'
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <StatCard
          title='Quotations Added'
          value={stats?.quotations_added_this_month || 0}
          subtitle='(This month)'
          isLoading={loading}
        />
      </div>
    </div>
  );
}
