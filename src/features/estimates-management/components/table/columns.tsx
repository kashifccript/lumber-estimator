'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type Estimate = {
  project_id: number;
  estimator_name: string;
  estimator_id: number;
  project_name: string;
  description?: string;
  material_count: number;
  total_cost: number;
  status: string;
  created_at: string;
  updated_at: string;
  statuses: {
    available: number;
    quotationNeeded: number;
  };
};

interface ColumnsProps {
  onRefresh: () => void;
}

const statusClasses: Record<string, string> = {
  pending: 'bg-[#E3A00833] text-[#E3A008]',
  approved: 'bg-[#00A42E33] text-[#00A42E]',
  rejected: 'bg-[#C81E1E33] text-[#C81E1E]',
  // Default fallback
  default: 'bg-gray-100 text-gray-800'
};

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<Estimate>[] => [
  {
    accessorKey: 'estimator_name',
    header: 'Estimator',
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.estimator_name}</span>
    )
  },
  {
    accessorKey: 'project_name',
    header: 'Project Name'
  },
  {
    accessorKey: 'material_count',
    header: 'Material',
    cell: ({ row }) => {
      const count = row.original.material_count;
      const statuses = row.original.statuses;
      return (
        <div className='flex flex-col gap-1'>
          <span>{count} materials</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'total_cost',
    header: 'Total Cost',
    cell: ({ row }) => {
      const cost = row.original.total_cost;
      return (
        <span className='font-medium'>
          $
          {cost?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      // Map status values to match our color scheme
      const normalizedStatus =
        status === 'planning'
          ? 'pending'
          : status === 'in_progress'
            ? 'pending'
            : status === 'completed'
              ? 'approved'
              : status === 'cancelled'
                ? 'rejected'
                : status === 'on_hold'
                  ? 'pending'
                  : status;

      const statusClass =
        statusClasses[normalizedStatus] || statusClasses.default;
      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}
        >
          {status?.replace('_', ' ').toUpperCase()}
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
