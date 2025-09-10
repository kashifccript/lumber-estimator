import { EstimatesList } from '@/features/admin/components/Estimators/estimates';
import EstimatorInfo from '@/features/admin/components/Estimators/estimator-detail';
import React from 'react';
interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return (
    <div className='py-8'>
      <EstimatorInfo id={id} />
    </div>
  );
}
