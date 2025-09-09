'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CustomTable } from '@/components/shared/table';
import { toast } from 'sonner';
import { createColumns } from './estimates-column';
import { Estimates } from '../../types/estimator';
import { useEstimatorApis } from '../../actions/estimator';
interface UserListingProps {
  query?: string;
  status?: string;
  user_id?: string;
}

export const EstimatesList: React.FC<UserListingProps> = ({
  query,
  user_id
}) => {
  const [users, setUsers] = useState<Estimates[]>([]);

  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { fetchAllEstimates } = useEstimatorApis();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchAllEstimates(user_id, query);
      console.log(response, 'sms');
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
  }, [session, query]);

  const handleRefresh = () => {
    fetchUsers();
  };

  const columns = createColumns({ onRefresh: handleRefresh });

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
          <p className='text-gray-600'>Loading ...</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <CustomTable data={users} columns={columns} itemsPerPage={10} />
    </div>
  );
};
