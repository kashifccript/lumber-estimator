'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Eye, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Quotation } from './columns';
import { useState } from 'react';

interface CellActionProps {
  data: Quotation;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onView = () => toast.message(`View quotation ${data.id}`);

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      // mock async delete
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast.success(`Quotation ${data.id} deleted`);
      onRefresh();
    } finally {
      setLoading(false);
      setOpenDelete(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onDeleteConfirm}
        loading={loading}
        title='Delete Quotation'
        description={`Are you sure you want to delete ${data.id}?`}
      />
      <div className='flex items-center gap-2.5'>
        <button
          onClick={onView}
          className='flex h-[32px] w-[32px] items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A]'
        >
          <Eye className='h-4 w-4 text-[#8896AB]' />
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className='flex h-[32px] w-[32px] items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A]'
        >
          <Trash className='h-4 w-4 text-[#8896AB]' />
        </button>
      </div>
    </>
  );
};
