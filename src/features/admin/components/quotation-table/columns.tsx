'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Quotation } from '../../types/quotation';

interface ColumnsProps {
  onRefresh: () => void;
}

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<Quotation>[] => [
  {
    accessorKey: 'id',
    header: 'Quotation ID',
    cell: ({ row }) => {
      const quotation = row.original;
      return (
        <div className='flex items-center'>
          <div className='h-8 w-8 flex-shrink-0'>{quotation.id}</div>
          
        </div>
      );
    }
  },
  {
    accessorKey: 'items',
    header: 'Items',
    cell: ({ cell }) => <div>{cell.getValue<string>()} </div>
  },

  {
    accessorKey: 'const',
    header: 'Total Cost',
    cell: ({ cell }) => <div>{cell.getValue<string>()} </div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ cell }) => {
      const status = cell.getValue<string>();
      const statusColors = {
        pending: 'bg-[#E3A00833]/20 text-[#E3A008]',
        approved: 'bg-[#00A42E33]/20 text-[#00A42E]',
        rejected: 'bg-[#C81E1E33]/20 text-[#C81E1E]'
      };

      return (
        <div className='text-sm'>
          <span
            className={`inline-flex rounded-full px-2.5 py-2 font-medium ${statusColors[status as keyof typeof statusColors] || 'bg-[#E3A00833]/20 text-[#E3A008]'}`}
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
