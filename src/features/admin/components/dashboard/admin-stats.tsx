'use client';
import { StatCard } from '@/components/shared/stat-card';
import { useSession } from 'next-auth/react';
import { useUserApis } from '../../actions/users';
import { useEffect, useRef, useState } from 'react';
import { StatsCard } from '../../types/user';
import { DashboardCharts } from '../stat-graph/stat-graphs';
import { UserListing } from '../user-tables/user-listing';
import { redirect } from 'next/navigation';

export default function AdminStats() {
  const { data: session } = useSession();
  const { getStats } = useUserApis();
  const [stats, setStats] = useState<StatsCard | null>(null);
  const [loading, setLoading] = useState(true);
  const chartsRef = useRef<HTMLDivElement>(null);
  // 👇 Function to scroll
  const scrollToCharts = () => {
    chartsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const pendindUserRef = useRef<HTMLDivElement>(null);
  // 👇 Function to scroll
  const scrollToUsers = () => {
    chartsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
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
    <div className='flex flex-col gap-3'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg p-3'>
        <div className='h-full min-h-[180px] flex'>
          <StatCard
            title='Pending Request'
            value={stats?.pending_requests || 0}
            isLoading={loading}
            className='h-full flex-1'
            // onClick={scrollToUsers}
             onClick={()=>{
              redirect("/dashboard/admin/user-management?status=pending")
            }}
          />
        </div>
        <div className='h-full min-h-[180px] flex'>
          <StatCard
            title='Total Active Users'
            value={stats?.total_active_users || 0}
            isLoading={loading}
            className='h-full flex-1'
            onClick={()=>{
              redirect("/dashboard/admin/user-management?status=approved")
            }}
          />
        </div>
        <div className='h-full min-h-[180px] flex'>
          <StatCard
            title='Estimates Created'
            value={stats?.estimates_created_this_month || 0}
            subtitle='(This month)'
            isLoading={loading}
            className='h-full flex-1'
            onClick={scrollToCharts}
          />
        </div>
        <div className='h-full min-h-[180px] flex'>
          <StatCard
            title='Quotations Added'
            value={stats?.quotations_added_this_month || 0}
            subtitle='(This month)'
            isLoading={loading}
            className='h-full flex-1'
            onClick={scrollToCharts}
          />
        </div>
      </div>
      <div ref={chartsRef} >
        <DashboardCharts />
      </div>
      <div ref={pendindUserRef}>
        <UserListing />
      </div>
    </div>
  );
}
