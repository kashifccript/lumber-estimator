'use client';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Estimate } from './columns';

interface CellActionProps {
  data: Estimate;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const router = useRouter();

  const onView = () => {
    router.push(
      `/dashboard/contractor/estimates-management/${data.project_id}`
    );
  };

  return (
    <>
      <div className='flex items-center gap-2.5'>
        <button
          onClick={onView}
          className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A]'
        >
          <Eye className='h-4 w-4 text-[#8896AB]' />
        </button>
      </div>
    </>
  );
};
