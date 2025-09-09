'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Check, Trash, X } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import UserDetails from '../../modals/user-detail';
import { Estimator, EstimatorDetailsTable } from '../../types/estimator';
import { redirect } from 'next/navigation';
import { useUserApis } from '../../actions/users';

interface CellActionProps {
  data: Estimator | EstimatorDetailsTable;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { deleteUser } = useUserApis();
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    if (!session?.user?.access_token) {
      toast.error('Authentication required');
      return;
    }
    try {
      const response = await deleteUser(data?.id);
      if (response) {
        toast.success('User Deleted Successfully!');
        onRefresh();
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        title='Delete Estimator'
        description={`Are you sure you want to delete this Estimator ?`}
      />
      <div className='flex items-center gap-2.5'>
        <>
          <button
            onClick={() => redirect(`/dashboard/admin/estimators/${data.id}`)}
            disabled={loading}
            className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
          >
            {/* <Check className='h-4 w-4 text-green-600' /> */}
            <Icon icon='proicons:eye' width='18' height='18' color='#8896AB' />
          </button>

          <button
            onClick={() => setIsOpen(true)}
            disabled={loading}
            className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
          >
            <Trash className='h-4 w-4 text-[#8896AB]' />
          </button>
        </>
      </div>
    </>
  );
};
