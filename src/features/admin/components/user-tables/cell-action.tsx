'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { PendingUser } from '../../types/user';
import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { approveUser, rejectUser } from '../../actions/users';

interface CellActionProps {
  data: PendingUser;
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
    try {
      const result = await approveUser(data.id, session.user.access_token);

      if (result.success) {
        toast.success(result.message);
        onRefresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to approve user');
    } finally {
      setLoading(false);
      setOpenApprove(false);
    }
  };

  const onReject = async () => {
    if (!session?.user?.access_token) {
      toast.error('Authentication required');
      return;
    }

    setLoading(true);
    try {
      const result = await rejectUser(data.id, session.user.access_token);

      if (result.success) {
        toast.success(result.message);
        onRefresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to reject user');
    } finally {
      setLoading(false);
      setOpenReject(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openApprove}
        onClose={() => setOpenApprove(false)}
        onConfirm={onApprove}
        loading={loading}
        title='Approve User'
        description={`Are you sure you want to approve ${data.first_name} ${data.last_name}?`}
      />
      <AlertModal
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
        onConfirm={onReject}
        loading={loading}
        title='Reject User'
        description={`Are you sure you want to reject ${data.first_name} ${data.last_name}?`}
      />
      <div className='flex items-center gap-2.5'>
        <button
          onClick={() => setOpenApprove(true)}
          disabled={loading}
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border border-green-200 bg-green-50 shadow-sm transition-colors hover:bg-green-100 disabled:opacity-50'
        >
          <Check className='h-4 w-4 text-green-600' />
        </button>
        <button
          onClick={() => setOpenReject(true)}
          disabled={loading}
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border border-red-200 bg-red-50 shadow-sm transition-colors hover:bg-red-100 disabled:opacity-50'
        >
          <X className='h-4 w-4 text-red-600' />
        </button>
      </div>
    </>
  );
};
