'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Estimate } from '../../types/estimate';
import { Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CellActionProps {
  data: Estimate;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {
    // Handle delete logic here
    console.log('Deleting estimate:', data.id);
    // Add your delete logic here
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className='flex items-center gap-2.5'>
        <Link
          href={`/dashboard/estimation-details`}
          className='flex h-8 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50'
        >
          <Eye className='h-4 w-4 text-[#8896AB]' />
        </Link>
        <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50'>
          <Edit className='h-4 w-4 text-[#8896AB]' />
        </button>
        <button
          onClick={() => setOpen(true)}
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50'
        >
          <Trash2 className='h-4 w-4 text-[#8896AB]' />
        </button>
      </div>
    </>
  );
};
