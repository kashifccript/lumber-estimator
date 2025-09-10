'use client';
import { CustomTable } from '@/components/shared/table';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { useUserApis } from '../../actions/users';
import { createColumns } from '../user-tables/columns';
import { toast } from 'sonner';
import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UserListingProps {
  query?: string;
}

export const UserListing: React.FC<UserListingProps> = ({ query }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const { fetchUsersList } = useUserApis();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');

  const buildQuery = () => {
    const params: string[] = [];

    if (selectedFilter !== 'All') {
      if (['contractor', 'estimator'].includes(selectedFilter)) {
        params.push(`role=${selectedFilter}`);
      } else {
        params.push(`status=${selectedFilter}`);
      }
    }

    if (search.trim()) {
      params.push(`search=${encodeURIComponent(search.trim())}`);
    }

    return params.length ? `${params.join('&')}` : '';
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryString = buildQuery();
      const response = await fetchUsersList(queryString);
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, selectedFilter, search]);

  const handleRefresh = () => {
    fetchUsers();
  };

  const columns = createColumns({ onRefresh: handleRefresh });

  return (
    <div>
      <div className='flex flex-col gap-6 sm:flex-row sm:justify-between py-4'>
        <div className='text-[24px] font-semibold text-[#1F1F1F]'>
          All Users{' '}
          <span className='font-normal text-[#1F1F1FCC]'>({users.length})</span>
        </div>

        <div className='flex flex-col gap-6 sm:flex-row sm:flex-row gap-4'>
          {/* Search box */}
          <div className='relative w-full max-w-sm'>
            <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#292D32]' />
            <Input
              type='text'
              placeholder='Search by Name or Email'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='h-[48px] rounded-[8px] border border-[#8896AB33] py-2 pr-4 pl-10 placeholder:text-[#292D32] focus-visible:ring-0 focus-visible:ring-offset-0'
            />
          </div>

          <CustomDropdown
            value={selectedFilter}
            onValueChange={setSelectedFilter}
          />
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
