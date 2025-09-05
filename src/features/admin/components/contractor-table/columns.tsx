'use client';
import { User } from '../../types/user';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Contractor } from '../../types/contractor';

interface ColumnsProps {
  onRefresh: () => void;
}

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<Contractor>[] => [
  {
    accessorKey: 'contractor',
    header: 'Contractor',
    cell: ({ row }) => {
      const contractor = row.original;
      return (
        <div className='flex items-center'>

          <div className='ml-3'>
            <div className='text-sm font-medium text-gray-900'>
              {contractor.contractor}
            </div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'Total Questions',
    header: 'totalQuestions',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'approvedQuestions',
    header: 'Approved Questions',
       cell: ({ cell }) => <div>{cell.getValue<string>()}</div>

  },
  {
    accessorKey: 'pendingQuestions',
    header: 'Pending Questions',
       cell: ({ cell }) => <div>{cell.getValue<string>()}</div>

  },
  {
    accessorKey: 'declined',
    header: 'Declined',
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
