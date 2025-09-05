'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getUsers } from '../../actions/users';
import { createColumns } from './columns';
import { toast } from 'sonner';
import { Quotation } from '../../types/quotation';
import { Quotations } from '../../data/sample-quotations';
import { CustomTable } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
interface UserListingProps {
  query?: string;
}

export const QuotationListing: React.FC<UserListingProps> = ({ query }) => {
  const [users, setUsers] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const fetchUsers = async () => {
    if (!session?.user?.access_token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getUsers(session.user.access_token, query);
      // setUsers(data);
      setUsers(Quotations);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch pending approvals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [session]);

  const handleRefresh = () => {
    fetchUsers();
  };

  const columns = createColumns({ onRefresh: handleRefresh });

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
          <p className='text-gray-600'>Loading pending approvals...</p>
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
      </div>
      <CustomTable data={users} columns={columns} itemsPerPage={2} />
    </div>
  );
};
