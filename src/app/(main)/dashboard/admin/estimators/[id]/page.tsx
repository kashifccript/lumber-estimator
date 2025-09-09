import { EstimatesList } from '@/features/admin/components/Estimators/estimates';
import EstimatorInfo from '@/features/admin/components/Estimators/estimator-detail';
import React from 'react';
interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  return (
    <div className='py-8'>
      <EstimatorInfo id={id} />
    </div>
  );
}
