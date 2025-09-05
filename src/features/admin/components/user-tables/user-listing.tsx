'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { getPendingApprovals, getUsers } from '../../actions/users';
import { CustomTable } from '@/components/shared/table';
import { createColumns } from './columns';
import { toast } from 'sonner';
import { pendingUser, sampleUsers } from '../../data/sample-users';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
interface UserListingProps {
  query?: string;
}

export const UserListing: React.FC<UserListingProps> = ({ query }) => {
  const [users, setUsers] = useState<User[]>([]);
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
      setUsers(pendingUser);
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
          Pending Users
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
      <CustomTable data={users} columns={columns} itemsPerPage={10} />

    </div>
  );
};
