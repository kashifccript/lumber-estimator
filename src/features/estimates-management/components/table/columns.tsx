'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type Estimate = {
  id: string;
  estimator: {
    name: string;
    avatar: string;
  };
  projectName: string;
  material: {
    count: number;
  };
  totalCost: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  updatedOn: string;
};

interface ColumnsProps {
  onRefresh: () => void;
}

const statusClasses: Record<Estimate['status'], string> = {
  Pending: 'bg-[#E3A00833] text-[#E3A008]',
  Approved: 'bg-[#00A42E33] text-[#00A42E]',
  Rejected: 'bg-[#C81E1E33] text-[#C81E1E]'
};

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<Estimate>[] => [
  {
    accessorKey: 'estimator',
    header: 'Estimator',
    cell: ({ row }) => {
      const estimator = row.original.estimator;
      return (
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200'>
            <img
              src={estimator.avatar}
              alt={estimator.name}
              className='h-8 w-8 rounded-full object-cover'
            />
          </div>
          <span className='text-sm font-medium'>{estimator.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'projectName',
    header: 'Project Name'
  },
  {
    accessorKey: 'material',
    header: 'Material',
    cell: ({ row }) => {
      const material = row.original.material;
      return <span className='text-sm'>{material.count} Items</span>;
    }
  },
  {
    accessorKey: 'totalCost',
    header: 'Total Cost',
    cell: ({ row }) => {
      const cost = row.original.totalCost;
      return <span className='text-sm font-medium'>$ {cost}</span>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status]}`}
        >
          {status}
        </span>
      );
    }
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
