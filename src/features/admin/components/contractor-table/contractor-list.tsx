'use client';
import { CustomTable } from '@/components/shared/table';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createColumns } from '../contractor-table/columns';
import { toast } from 'sonner';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Contractor } from '../../types/contractor';
import { useContractorApis } from '../../actions/contractor';

interface UserListingProps {
  query?: string;
}

export const ContractorListing: React.FC<UserListingProps> = ({ query }) => {
  const [users, setUsers] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [search, setSearch] = useState('');
  const { fetchAllContractors } = useContractorApis();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchAllContractors(search);
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
          All Contractors{' '}
          <span className='font-normal text-[#1F1F1FCC]'>
            ({users?.length})
          </span>
        </div>

        <div className='flex flex-row gap-4'>
          <div className='relative w-full max-w-sm'>
            {/* Search Icon */}
            <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#292D32]' />

            {/* Input */}
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
