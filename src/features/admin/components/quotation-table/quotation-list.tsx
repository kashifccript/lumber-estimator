'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createColumns } from './columns';
import { toast } from 'sonner';
import { CustomTable } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useContractorApis } from '../../actions/contractor';
import { Quotation } from '../../types/contractor';
interface UserListingProps {
  query?: string;
  showButton?: boolean;
  status?: string;
  user_id?: string;
}

export const QuotationListing: React.FC<UserListingProps> = ({
  showButton = true,
  user_id,
  status
}) => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { fetchAllQuotationsbyUser } = useContractorApis();

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetchAllQuotationsbyUser(
        user_id,
        status === 'all' || status === 'All' ? '' : status
      );
      setQuotations(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchQuotations();
    }
  }, [session, status, user_id]);

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
        <div className='text-[24px] font-semibold text-[#1F1F1F]'>
          Quotations
        </div>
        {showButton && (
          <Button
            variant={'outline'}
            className='w-full max-w-[129px] rounded-[8px] border-[#E2624B] text-[#E2624B] hover:text-[#E2624B]'
          >
            <Icon
              icon='meteor-icons:arrow-up-right'
              color='#E2624B'
              className='h-6 w-6'
            />
            View All
          </Button>
        )}
      </div>
      <CustomTable
        data={quotations}
        columns={columns}
        itemsPerPage={2}
        isLoading={loading}
      />
    </div>
  );
};
