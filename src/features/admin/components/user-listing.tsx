'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { User } from '../types/user';
import { getPendingApprovals, getUsers } from '../actions/users';
import { UserTable } from './user-tables';
import { createColumns } from './user-tables/columns';
import { toast } from 'sonner';
import { sampleUsers } from '../data/sample-users';
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
      setUsers(sampleUsers);
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

  return <UserTable data={users} columns={columns} itemsPerPage={10} />;
};
