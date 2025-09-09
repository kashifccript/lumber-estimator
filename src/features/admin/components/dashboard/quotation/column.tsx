'use client';
import { QuotationDashboard } from '@/features/admin/types/contractor';
import type { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '../../quotation-table/cell-action';

interface ColumnsProps {
  onRefresh: () => void;
}

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<QuotationDashboard>[] => [
  {
    accessorKey: 'quotation_id',
    header: 'Quotation ID',
    cell: ({ row }) => {
      const quotation = row.original;
      return (
        <div className='flex items-center'>
          <div className='h-8 w-8 flex-shrink-0'>#{quotation.quotation_id}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'contractor',
    header: 'Contractor',
    cell: ({ row }) => {
      const contractor = row.original.contractor;
      return (
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium'>
            {contractor.first_name?.[0]}
            {contractor.last_name?.[0]}
          </div>
          <span className='font-medium'>{contractor.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'item_count',
    header: 'Items',
    cell: ({ cell }) => <div>{`${cell.getValue<number>()} Items`}</div>
  },
  {
    accessorKey: 'total_cost',
    header: 'Total Cost',
    cell: ({ cell }) => <div>{`$ ${cell.getValue<number>()}`}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ cell }) => {
      const status = cell.getValue<string>();
      const statusColors = {
        pending: 'bg-[#E3A00833] text-[#E3A008]',
        approved: 'bg-[#00A42E33] text-[#00A42E]',
        rejected: 'bg-[#C81E1E33] text-[#C81E1E]'
      };

      return (
        <div className='text-sm'>
          <span
            className={`inline-flex rounded-full px-2.5 py-2 font-medium capitalize ${statusColors[status as keyof typeof statusColors] || 'bg-[#E3A00833]/20 text-[#E3A008]'}`}
          >
            {status || 'Pending'}
          </span>
        </div>
      );
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
