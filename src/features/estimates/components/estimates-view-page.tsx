'use client';
import PageContainer from '@/components/layout/page-container';
import React, { useState } from 'react';
import Heading from './heading';
import Link from 'next/link';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { StatusProgress } from './status-progress';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';

interface Estimate {
  id: string;
  projectName: string;
  material: string;
  totalCost: string;
  status: {
    pending: number;
    approved: number;
    rejected: number;
    quotationNeeded: number;
  };
}

const mockEstimates: Estimate[] = [
  {
    id: '#BF123973OD',
    projectName: 'Residential Complex',
    material: '45 Items',
    totalCost: '$ 127,344',
    status: { pending: 30, approved: 40, rejected: 15, quotationNeeded: 15 }
  },
  {
    id: '#BF123974OD',
    projectName: 'Commercial Building',
    material: '32 Items',
    totalCost: '$ 89,200',
    status: { pending: 20, approved: 50, rejected: 0, quotationNeeded: 30 }
  },
  {
    id: '#BF123975OD',
    projectName: 'Office Tower',
    material: '67 Items',
    totalCost: '$ 245,100',
    status: { pending: 25, approved: 45, rejected: 0, quotationNeeded: 30 }
  },
  {
    id: '#BF123976OD',
    projectName: 'Shopping Mall',
    material: '89 Items',
    totalCost: '$ 312,500',
    status: { pending: 35, approved: 35, rejected: 0, quotationNeeded: 30 }
  },
  {
    id: '#BF123977OD',
    projectName: 'Hotel Complex',
    material: '54 Items',
    totalCost: '$ 189,750',
    status: { pending: 15, approved: 60, rejected: 5, quotationNeeded: 20 }
  },
  {
    id: '#BF123978OD',
    projectName: 'Hospital Wing',
    material: '73 Items',
    totalCost: '$ 298,400',
    status: { pending: 40, approved: 30, rejected: 10, quotationNeeded: 20 }
  },
  {
    id: '#BF123979OD',
    projectName: 'School Building',
    material: '41 Items',
    totalCost: '$ 156,300',
    status: { pending: 30, approved: 50, rejected: 0, quotationNeeded: 20 }
  }
];

const columns = [
  {
    key: 'id',
    header: 'Estimate ID',
    className: 'min-w-[150px]'
  },
  {
    key: 'projectName',
    header: 'Project Name',
    className: 'min-w-[200px]'
  },
  {
    key: 'material',
    header: 'Material',
    className: 'min-w-[120px]'
  },
  {
    key: 'totalCost',
    header: 'Total Cost',
    className: 'min-w-[120px]'
  },
  {
    key: 'status',
    header: 'Status',
    className: 'min-w-[150px]',
    cell: (estimate: Estimate) => <StatusProgress data={estimate.status} />
  },
  {
    key: 'actions',
    header: 'Actions',
    className: 'min-w-[120px]',
    cell: (estimate: Estimate) => (
      <div className='flex items-center gap-2.5'>
        <Link
          href={`/dashboard/estimation-details`}
          className='flex h-8 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50'
        >
          <Eye className='h-4 w-4 text-[#8896AB]' />
        </Link>
        <button className='flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50'>
          <Edit className='h-4 w-4 text-[#8896AB]' />
        </button>
        <button className='flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50'>
          <Trash2 className='h-4 w-4 text-[#8896AB]' />
        </button>
      </div>
    )
  }
];
export default function EstimatesViewPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockEstimates.length / itemsPerPage);
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 pb-6'>
        <Heading />
        {/* Data Table */}
        <DataTable
          data={mockEstimates}
          columns={columns}
          pagination={{
            page: currentPage,
            totalPages: totalPages,
            onPageChange: setCurrentPage,
            itemsPerPage: itemsPerPage
          }}
        />
      </div>
    </PageContainer>
  );
}
