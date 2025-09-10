'use client';
import PageContainer from '@/components/layout/page-container';
import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { CustomTable } from '@/components/shared/table';
import { Input } from '@/components/ui/input';
import { estimatesManagementDropdownList } from '@/lib/api/constants';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createColumns, Estimate } from './table/columns';
import { useSession } from 'next-auth/react';
import { useEstimatorApis } from '@/features/admin/actions/estimator';
import { toast } from 'sonner';
import { Estimates } from '@/features/admin/types/estimator';
import { getAllEstimates } from '@/features/contractor/actions/estimates';

export default function EstimatesManagementViewPage() {
  const [users, setUsers] = useState<Estimate[]>([]);
  const [estimatorInfo, setEstimatorInfo] = useState<{
    estimator_id: number;
    estimator_name: string;
    total_projects: number;
  } | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const id = 2;

  const fetchEstimates = async () => {
    try {
      setLoading(true);
      const response = await getAllEstimates(id);
      console.log(response, 'response');
      if (response.success && response.data) {
        setUsers(response.data.projects || []);
        setEstimatorInfo({
          estimator_id: response.data.estimator_id,
          estimator_name: response.data.estimator_name,
          total_projects: response.data.total_projects
        });
      } else {
        setUsers([]);
        setEstimatorInfo(null);
        toast.error(response.message || 'Failed to fetch estimates');
      }
    } catch (error) {
      console.error('Error fetching estimates:', error);
      toast.error('Failed to fetch estimates');
      setUsers([]);
      setEstimatorInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstimates();
  }, [session]);

  const handleRefresh = () => {
    fetchEstimates();
  };

  const columns = createColumns({
    onRefresh: handleRefresh,
    estimatorName: estimatorInfo?.estimator_name || ''
  });

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-3'>
        <div className='flex items-center justify-between gap-2'>
          <h1 className='text-2xl font-semibold'>
            {estimatorInfo
              ? `${estimatorInfo.estimator_name}'s Projects`
              : 'All Estimates'}
          </h1>

          <div className='flex flex-row gap-4'>
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

            {/* Dropdown */}
            <CustomDropdown
              options={estimatesManagementDropdownList}
              value={selectedFilter}
              onValueChange={setSelectedFilter}
            />
          </div>
        </div>

        {/* Table */}
        <CustomTable data={users} columns={columns} itemsPerPage={10} />
      </div>
    </PageContainer>
  );
}
