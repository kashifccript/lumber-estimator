'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { User } from '../../types/user';
import { Check, Trash, X } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import UserDetails from '../../modals/user-detail';
import { useUserApis } from '../../actions/users';

interface CellActionProps {
  data: User;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { data: session } = useSession();
  const [userId, setUserId] = useState<undefined | number | string>(undefined);
  const { deleteUser } = useUserApis();

  const [isOpen, setIsOpen] = useState(false);

  const onApprove = async () => {
    if (!session?.user?.access_token) {
      toast.error('Authentication required');
      return;
    }

    setLoading(true);
  };

  const onDeleteClick = async () => {
    if (!session?.user?.access_token) {
      toast.error('Authentication required');
      return;
    }
    try {
      const response = await deleteUser(userId);
      if (response) {
        toast.success('User Deleted Successfully!');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
      setIsOpen(false)
    }
  };

  const onReject = async () => {
    if (!session?.user?.access_token) {
      toast.error('Authentication required');
      return;
    }

    setLoading(true);
  };
  return (
    <>
      <AlertModal
        isOpen={openApprove}
        onClose={() => setOpenApprove(false)}
        onConfirm={onApprove}
        loading={loading}
        title='Approve User'
        description={`Are you sure you want to Approve ${data.user_name} ?`}
      />
      <AlertModal
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
        onConfirm={onReject}
        loading={loading}
        title='Reject User'
        description={`Are you sure you want to Reject ${data.user_name} ?`}
      />
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onDeleteClick}
        loading={loading}
        title='Delete User'
        description={`Are you sure you want to Delete ${data.user_name} ?`}
      />
      <div className='flex items-center gap-2.5'>
        {data.status === 'Pending' && (
          <>
            <button
              onClick={() => {
                setUserId(data.id);
                setIsOpen(true);
              }}
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
              onClick={() => setOpenApprove(true)}
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
        {(data.status === 'Approved' || data.status === 'Rejected') && (
          <>
            <button
              onClick={() => {
                setUserId(data.id);
                setIsOpen(true);
              }}
              disabled={loading}
              className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
            >
              {/* <Check className='h-4 w-4 text-green-600' /> */}
              <Icon
                icon='proicons:eye'
                width='18'
                height='18'
                color='#8896AB'
              />
            </button>

            <button
              onClick={() => {
                setUserId(data.id);
                setOpenDelete(true);
              }}
              disabled={loading}
              className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A] transition-colors disabled:opacity-50'
            >
              <Trash className='h-4 w-4 text-[#8896AB]' />
            </button>
          </>
        )}
      </div>
      <UserDetails
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        id={userId}
      />
    </>
  );
};
