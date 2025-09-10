'use client';
import { CustomTable } from '@/components/shared/table';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createColumns } from './columns';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Estimator } from '../../types/estimator';
import { useEstimatorApis } from '../../actions/estimator';

interface EstimatorListingProps {
  query?: string;
}

export const EstimatorListing: React.FC<EstimatorListingProps> = ({
  query
}) => {
  const [users, setUsers] = useState<Estimator[]>([]);

  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [search, setSearch] = useState('');
  const { fetchAllEstimators } = useEstimatorApis();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchAllEstimators(search);
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [session, search]);

  const handleRefresh = () => {
    fetchUsers();
  };

  const columns = createColumns({ onRefresh: handleRefresh });
  return (
    <div>
      <div className='flex flex-col gap-6 sm:flex-row sm:justify-between py-4'>
        <div className='text-[24px] font-semibold text-[#1F1F1F]'>
          All Estimators{' '}
          <span className='font-normal text-[#1F1F1FCC]'>({users?.length})</span>
        </div>

        <div className='flex flex-row gap-4'>
          <div className='relative w-full max-w-sm'>
            {/* Search Icon */}
            <Input
              type='text'
              placeholder='Search'
              className='h-[48px] rounded-[8px] border border-[#8896AB33] py-2 pr-4 pl-10 placeholder:text-[#292D32] focus-visible:ring-0 focus-visible:ring-offset-0'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <CustomTable
        data={users}
        columns={columns}
        itemsPerPage={10}
        isLoading={loading}
      />
    </div>
  );
};
