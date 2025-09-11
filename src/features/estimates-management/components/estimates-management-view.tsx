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
import {
  getAllEstimates,
  GetAllEstimatesParams
} from '@/features/contractor/actions/estimates';

export default function EstimatesManagementViewPage() {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 100,
    offset: 0,
    total: 0
  });

  const { data: session } = useSession();

  const fetchEstimates = async (params?: GetAllEstimatesParams) => {
    try {
      setLoading(true);
      const response = await getAllEstimates({
        search: params?.search || search,
        status:
          params?.status ||
          (selectedFilter !== 'All' ? selectedFilter : undefined),
        limit: params?.limit || pagination.limit,
        offset: params?.offset || pagination.offset
      });

      console.log(response, 'response');
      if (response.success && response.data) {
        const estimatesData = response.data.estimates || [];
        setEstimates(estimatesData);

        // Update pagination info if available
        if (response.data.total !== undefined) {
          setPagination((prev) => ({
            ...prev,
            total: response.data.total
          }));
        }
      } else {
        setEstimates([]);
        toast.error(response.message || 'Failed to fetch estimates');
      }
    } catch (error) {
      console.error('Error fetching estimates:', error);
      toast.error('Failed to fetch estimates');
      setEstimates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchEstimates();
    }
  }, [session]);

  // Debounced search effect
  useEffect(() => {
    if (session && search !== '') {
      const timer = setTimeout(() => {
        fetchEstimates({ search });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [search, session]);

  // Filter change effect
  useEffect(() => {
    if (session) {
      fetchEstimates({
        status: selectedFilter !== 'All' ? selectedFilter : undefined
      });
    }
  }, [selectedFilter, session]);

  const handleRefresh = () => {
    fetchEstimates();
  };

  const columns = createColumns({
    onRefresh: handleRefresh
  });

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-3'>
        <div className='flex items-center justify-between gap-2'>
          <h1 className='text-2xl font-semibold'>
            All Estimates
            {estimates.length > 0 && (
              <span className='ml-2 text-sm font-normal text-gray-500'>
                ({estimates.length} total)
              </span>
            )}
          </h1>

          <div className='flex flex-row gap-4'>
            {/* Search box */}
            <div className='relative w-full max-w-sm'>
              <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#292D32]' />
              <Input
                type='text'
                placeholder='Search Estimator'
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
        <CustomTable
          data={estimates}
          columns={columns}
          itemsPerPage={10}
        />
      </div>
    </PageContainer>
  );
}
