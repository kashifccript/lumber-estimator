'use client';
import CircleProgress from '@/components/shared/circular-progress';
import { EstimatorStats } from '@/components/shared/estimator-stat-card';
import { StatCard } from '@/components/shared/stat-card';
import { useEffect, useState } from 'react';

export default function Stats() {
  const [loading, setLoading] = useState(false);

  return (
    <div className='grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-5'>
      <div className='h-full'>
        <CircleProgress />
      </div>
      <div className='h-full'>
        <EstimatorStats title='Total Projects' value={0} isLoading={loading} />
      </div>
      <div className='h-full'>
        <EstimatorStats
          title='Active Estimates'
          value={0}
          isLoading={loading}
        />
      </div>
      <div className='h-full'>
        <EstimatorStats title='This Month Expense' value={0} isLoading={loading} />
      </div>
      <div className='h-full'>
        <EstimatorStats title='No of Contractor' value={0} isLoading={loading} />
      </div>
    </div>
  );
}
