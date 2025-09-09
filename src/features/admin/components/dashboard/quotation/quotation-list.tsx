'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CustomTable } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import {
  Quotation,
  QuotationDashboard
} from '@/features/admin/types/contractor';
import { useContractorApis } from '@/features/admin/actions/contractor';
import { createColumns } from './column';
interface UserListingProps {
  query?: string;
  showButton?: boolean;
  status?: string;
}

export const QuotationListingDashboard: React.FC<UserListingProps> = ({
  showButton = true,
  status,
  query
}) => {
  const [quotations, setQuotations] = useState<QuotationDashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { fetchAllQuotations } = useContractorApis();

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetchAllQuotations(
        query,
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
    if (session) {
      fetchQuotations();
    }
  }, [session, status]);

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
