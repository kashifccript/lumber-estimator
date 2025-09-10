'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Eye, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Quotation } from '@/features/admin/types/contractor';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteQuotation } from '../../actions/actions';

interface CellActionProps {
  data: Quotation;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const onView = () => {
    router.push(`/dashboard/contractor/quotation-details/${data.quotation_id}`);
  };

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      const res = await deleteQuotation(Number(data.quotation_id));
      if (res.success) {
        toast.success(`Quotation ${data.quotation_id} deleted successfully`);
        onRefresh();
      } else {
        toast.error(`Failed to delete quotation ${data.quotation_id}`);
      }
    } catch (error) {
      toast.error(`Failed to delete quotation ${data.quotation_id}`);
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
        description={`Are you sure you want to delete quotation ${data.quotation_id}?`}
      />
      <div className='flex items-center gap-2.5'>
        <button
          onClick={onView}
          className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A]'
        >
          <Eye className='h-4 w-4 text-[#8896AB]' />
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A]'
        >
          <Trash className='h-4 w-4 text-[#8896AB]' />
        </button>
      </div>
    </>
  );
};
