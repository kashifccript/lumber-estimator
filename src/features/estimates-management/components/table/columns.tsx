'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type Estimate = {
  project_id: number;
  project_name: string;
  description?: string;
  project_type?: string | null;
  location?: string | null;
  total_cost: number;
  status: string;
  client_name?: string | null;
  client_contact?: string | null;
  skus: any[];
  item_count: number;
  statuses: {
    available: number;
    quotationNeeded: number;
  };
  created_at: string;
  updated_at: string;
};




interface ColumnsProps {
  onRefresh: () => void;
  estimatorName: string;
}

const statusClasses: Record<string, string> = {
  planning: 'bg-[#E3A00833] text-[#E3A008]',
  in_progress: 'bg-[#0066CC33] text-[#0066CC]',
  completed: 'bg-[#00A42E33] text-[#00A42E]',
  cancelled: 'bg-[#C81E1E33] text-[#C81E1E]',
  on_hold: 'bg-[#8896AB33] text-[#8896AB]'
};

export const createColumns = ({
  onRefresh,
  estimatorName
}: ColumnsProps): ColumnDef<Estimate>[] => [
  {
    accessorKey: 'estimator_name',
    header: 'Estimator',
    cell: () => <span className='font-medium'>{estimatorName}</span>
  },
  {
    accessorKey: 'project_name',
    header: 'Project Name'
  },
  {
    accessorKey: 'item_count',
    header: 'Item Count',
   
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
      const statusClass = statusClasses[status] || 'bg-gray-100 text-gray-800';
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