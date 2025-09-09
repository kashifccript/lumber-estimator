'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createColumns } from './columns';
import { toast } from 'sonner';
import { CustomTable } from '@/components/shared/table';
import { useContractorApis } from '@/features/admin/actions/contractor';
import { Item } from '@/features/admin/types/contractor';
import { redirect, useParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modal/alert-modal';
interface ItemListingProps {
  quotation_id?: string;
}

export const ItemListing: React.FC<ItemListingProps> = ({ quotation_id }) => {
  const [quotations, setQuotations] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const { data: session } = useSession();
  const { fetchAllItemsWithinQuotation, updateQuotationStatus } = useContractorApis();
  const params = useParams<{ id: string }>();

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetchAllItemsWithinQuotation(quotation_id);
      console.log(response, 'response');
      setQuotations(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quotation_id) {
      fetchQuotations();
    }
  }, [session, quotation_id]);

  const handleRefresh = () => {
    fetchQuotations();
  };

  const columns = createColumns({ onRefresh: handleRefresh });
  const onApprove = async () => {
    if (!session?.user?.access_token) {
      return;
    }

    try {
      setLoading(true);
      const response = await updateQuotationStatus(quotation_id, true);
      if (response) {
        toast.success('Quotation Approved Successfully!');
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
      const response = await updateQuotationStatus(quotation_id, false);
      if (response) {
        toast.success('Quotation Rejected Successfully!');
      }
    } catch (error) {
      toast.error('Error rejecting Quotation');
    } finally {
      setLoading(false);
      setOpenReject(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
          <p className='text-gray-600'>Loading Quotations</p>
        </div>
      </div>
    );
  }
  if (!quotations) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='flex flex-col items-center space-y-4'>
          <p className='text-gray-600'>No Data found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AlertModal
        isOpen={openApprove}
        onClose={() => setOpenApprove(false)}
        onConfirm={onApprove}
        loading={loading}
        title='Approve Quotation'
        description={`Are you sure you want to Approve this Quotation ?`}
      />
      <AlertModal
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
        onConfirm={onReject}
        loading={loading}
        title='Reject Quotation'
        description={`Are you sure you want to Reject this Quotation ?`}
      />
      <div className='flex flex-row justify-between py-4'>
        <div className='flex flex-row gap-3 text-[24px] font-semibold text-[#1F1F1F]'>
          <Icon
            icon='weui:back-filled'
            width='12'
            height='24'
            className='mt-1.5 cursor-pointer'
            color='#1F1F1F73'
            onClick={() => {
              redirect(`/dashboard/admin/contractors/${params.id}`);
            }}
          />
          <span className='!text-[#1F1F1F73]'> Contractors/ {params.id}/</span>
          {quotation_id}
        </div>
      </div>
      <CustomTable data={quotations} columns={columns} itemsPerPage={2} />
      <div className='flex flex-row justify-between py-4'>
        <div></div>

        <div className='flex flex-row gap-4'>
          <Button
            variant={'destructive'}
            className='h-[48px] w-auto rounded-[8px]'
            onClick={() => setOpenReject(true)}
          >
            Reject
          </Button>
          <Button
            className='h-[48px] w-auto rounded-[5px] bg-[#00A42E] text-white hover:bg-[#00A42E]'
            onClick={() => setOpenApprove(true)}
          >
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
};
