import { StatCard } from '@/components/shared/stat-card';

export default function AdminStats() {
  return (
    <div className='grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-4'>
      <div className='h-full'>
        <StatCard title='Pending Request' value='12' />
      </div>
      <div className='h-full'>
        <StatCard title='Total Active Users' value='12' />
      </div>
      <div className='h-full'>
        <StatCard
          title='Estimates Created'
          value='12'
          subtitle='(This month)'
        />
      </div>
      <div className='h-full'>
        <StatCard title='Quotations Added' value='12' subtitle='(This month)' />
      </div>
    </div>
  );
}
