'use client';
import PageContainer from '@/components/layout/page-container';
import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { CustomTable } from '@/components/shared/table';
import { Input } from '@/components/ui/input';
import { estimatesManagementDropdownList } from '@/lib/api/constants';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { createColumns, Estimate } from './table/columns';

export default function EstimatesManagementViewPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');
  // const [estimates, setEstimates] = useState<Estimate[]>([]);
  // const [loading, setLoading] = useState(false);

  // Mock data based on the image
  const mockEstimates: Estimate[] = [
    {
      id: 'EST-001',
      estimator: {
        name: 'Dianne Russell',
        avatar: '/assets/icons/profile.png'
      },
      projectName: 'Residential Complex',
      material: { count: 45 },
      totalCost: '127,344',
      status: 'Approved',
      updatedOn: '2024-01-15'
    },
    {
      id: 'EST-002',
      estimator: {
        name: 'Dianne Russell',
        avatar: '/assets/icons/profile.png'
      },
      projectName: 'Residential Complex',
      material: { count: 45 },
      totalCost: '127,344',
      status: 'Pending',
      updatedOn: '2024-01-14'
    },
    {
      id: 'EST-003',
      estimator: {
        name: 'Dianne Russell',
        avatar: '/assets/icons/profile.png'
      },
      projectName: 'Residential Complex',
      material: { count: 45 },
      totalCost: '127,344',
      status: 'Rejected',
      updatedOn: '2024-01-13'
    }
  ];

  const handleRefresh = () => {
    // Add refresh logic here
    // console.log('Refreshing estimates...');
  };

  const columns = createColumns({ onRefresh: handleRefresh });

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-3'>
        <div className='flex items-center justify-between gap-2'>
          <h1 className='text-2xl font-semibold'>All Estimates</h1>

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
        <CustomTable data={mockEstimates} columns={columns} itemsPerPage={10} />
      </div>
    </PageContainer>
  );
}
