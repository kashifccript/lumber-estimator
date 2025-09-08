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
interface ItemListingProps {
  quotation_id?: string;
}

export const ItemListing: React.FC<ItemListingProps> = ({ quotation_id }) => {
  const [quotations, setQuotations] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { fetchAllItemsWithinQuotation } = useContractorApis();
  const params = useParams<{ id: string }>();

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetchAllItemsWithinQuotation(quotation_id);
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
    </div>
  );
};
