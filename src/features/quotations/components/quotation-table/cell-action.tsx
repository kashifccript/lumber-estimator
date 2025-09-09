'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Eye, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Item } from './columns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CellActionProps {
  data: Item;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const onView = () => {
    console.log('View item:', data);
    // Add view functionality here
  };

  const onEdit = () => {
    console.log('Edit item:', data);
    // Add edit functionality here
  };

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      // mock async delete
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast.success(`Item ${data.name} deleted`);
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
        title='Delete Item'
        description={`Are you sure you want to delete ${data.name}?`}
      />
      <div className='flex items-center gap-2.5'>
        <button
          onClick={onEdit}
          className='flex h-[32px] w-[32px] items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A]'
        >
          <Pencil className='h-4 w-4 text-[#8896AB]' />
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
