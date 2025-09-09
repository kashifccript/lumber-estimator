'use client';

import { Icon } from '@iconify/react';
import { Estimator, EstimatorDetailsTable } from '../../types/estimator';
import { redirect } from 'next/navigation';

interface CellActionProps {
  data: Estimator | EstimatorDetailsTable;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  return (
    <>
      <div className='flex items-center gap-2.5'>
        <>
          <button
            onClick={() => redirect(`/dashboard/admin/estimators/${data.id}`)}
            className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
          >
            <Icon icon='proicons:eye' width='18' height='18' color='#8896AB' />
          </button>
        </>
      </div>
    </>
  );
};
