'use client';
import { CustomTable } from '@/components/shared/table';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createColumns } from '../contractor-table/columns';
import { toast } from 'sonner';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Contractor } from '../../types/contractor';
import { sample_contractors } from '../../data/sample-contractor';

interface UserListingProps {
  query?: string;
}

export const ContractorListing: React.FC<UserListingProps> = ({ query }) => {
  const [users, setUsers] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const fetchUsers = async () => {
    if (!session?.user?.access_token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // const data = await getUsers(session.user.access_token, query);
      // setUsers(data);
      setUsers(sample_contractors);
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
  const [selectedStatus, setSelectedStatus] = useState('All');

  const columns = createColumns({ onRefresh: handleRefresh });
  return (
    <div>
      <div className='flex flex-row justify-between py-4'>
        <div className='text-[24px] font-semibold text-[#1F1F1F]'>
          All Contractors{' '}
          <span className='font-normal text-[#1F1F1FCC]'>(24)</span>
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
            />
          </div>
        </div>
      </div>
      <CustomTable data={users} columns={columns} itemsPerPage={10} />
    </div>
  );
};
