'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Check, Trash, X } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { redirect, useParams } from 'next/navigation';
import { useContractorApis } from '../../actions/contractor';

interface CellActionProps {
  data: any ;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { data: session } = useSession();
  const { updateQuotationStatus, delteQuotation } = useContractorApis();

  const onApprove = async () => {
    if (!session?.user?.access_token) {
      return;
    }

    try {
      setLoading(true);
      const response = await updateQuotationStatus(data.quotation_id, true);
      if (response) {
        toast.success('Quotation Approved Successfully!');
        onRefresh();
      } else toast.error('Error approving quotation:');
    } catch (error) {
      toast.error('Error approving quotation');
    } finally {
      setLoading(false);
      setOpenApprove(false);
    }
  };
  const onReject = async () => {
    if (!session?.user?.access_token) {
      return;
    }

    try {
      setLoading(true);
      const response = await updateQuotationStatus(data.quotation_id, false);
      if (response) {
        toast.success('Quotation Rejected Successfully!');
        onRefresh();
      }
    } catch (error) {
      toast.error('Error rejecting Quotation');
    } finally {
      setLoading(false);
      setOpenReject(false);
    }
  };
  const onDelete = async () => {
    if (!session?.user?.access_token) {
      return;
    }

    try {
      setLoading(true);
      const response = await delteQuotation(data.quotation_id);
      if (response) {
        toast.success('Quotation Deleted Successfully!');
        onRefresh();
      }
    } catch (error) {
      toast.error('Error Deleting Quotation');
    } finally {
      setLoading(false);
      setOpenDelete(false);
    }
  };

  const params = useParams<{ id: string }>();

  return (
    <>
      <AlertModal
        isOpen={openApprove}
        onClose={() => setOpenApprove(false)}
        onConfirm={onApprove}
        loading={loading}
        title='Approve Quotation'
        description={`Are you sure you want to approve Quotation `}
      />
      <AlertModal
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
        onConfirm={onReject}
        loading={loading}
        title='Reject Quotation'
        description={`Are you sure you want to reject Quotation `}
      />
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onDelete}
        loading={loading}
        title='Delete Quotation'
        description={`Are you sure you want to Delete Quotation `}
      />
      <div className='flex items-center gap-2.5'>
        {data.status === 'pending' && (
          <>
            <button
              onClick={() =>
                redirect(
                  `/dashboard/admin/contractors/${params.id || data.contractor?.id}/${data.quotation_id}`
                )
              }
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
        {(data.status === 'approved' || data.status === 'rejected') && (
          <>
            <button
              onClick={() =>
                redirect(
                  `/dashboard/admin/contractors/${params.id || data.contractor?.id}/${data.quotation_id}`
                )
              }
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
              onClick={() => setOpenDelete(true)}
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
