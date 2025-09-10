'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Check, Trash, X } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { Quotation } from '@/features/admin/types/contractor';

interface CellActionProps {
  data: Quotation;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const { data: session } = useSession();

  const onApprove = async () => {
    if (!session?.user?.access_token) {
      toast.error('Authentication required');
      return;
    }

    setLoading(true);
    // try {
    //   const result = await approveUser(data.id, session.user.access_token);

    //   if (result.success) {
    //     toast.success(result.message);
    //     onRefresh();
    //   } else {
    //     toast.error(result.message);
    //   }
    // } catch (error) {
    //   toast.error('Failed to approve user');
    // } finally {
    //   setLoading(false);
    //   setOpenApprove(false);
    // }
  };

  const onReject = async () => {
    if (!session?.user?.access_token) {
      toast.error('Authentication required');
      return;
    }

    setLoading(true);
    // try {
    //   const result = await rejectUser(data.id, session.user.access_token);

    //   if (result.success) {
    //     toast.success(result.message);
    //     onRefresh();
    //   } else {
    //     toast.error(result.message);
    //   }
    // } catch (error) {
    //   toast.error('Failed to reject user');
    // } finally {
    //   setLoading(false);
    //   setOpenReject(false);
    // }
  };

  return (
    <>
      <AlertModal
        isOpen={openApprove}
        onClose={() => setOpenApprove(false)}
        onConfirm={onApprove}
        loading={loading}
        title='Approve User'
        description={`Are you sure you want to approve `}
      />
      <AlertModal
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
        onConfirm={onReject}
        loading={loading}
        title='Reject User'
        description={`Are you sure you want to reject `}
      />
      <div className='flex items-center gap-2.5'>
        {data.status === 'pending' && (
          <>
            <button
              onClick={() => setOpenApprove(true)}
              disabled={loading}
              className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
            >
              <Icon
                icon='proicons:eye'
                width='18'
                height='18'
                color='#8896AB'
              />
            </button>

            <button
              onClick={() => setOpenReject(true)}
              disabled={loading}
              className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
            >
              <Check className='h-4 w-4 text-[#8896AB]' />
            </button>
            <button
              onClick={() => setOpenReject(true)}
              disabled={loading}
              className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
            >
              <X className='h-4 w-4 text-[#8896AB]' />
            </button>
          </>
        )}
        {(data.status === 'approved' || data.status === 'rejected') && (
          <>
            <button
              onClick={() => setOpenApprove(true)}
              disabled={loading}
              className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
            >
              <Icon
                icon='proicons:eye'
                width='18'
                height='18'
                color='#8896AB'
              />
            </button>

            <button
              onClick={() => setOpenReject(true)}
              disabled={loading}
              className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
            >
              <Trash className='h-4 w-4 text-[#8896AB]' />
            </button>
          </>
        )}
      </div>
    </>
  );
};
