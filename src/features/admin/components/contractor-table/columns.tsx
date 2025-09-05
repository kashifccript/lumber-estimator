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
    accessorKey: 'totalQuestions',
    header: 'Total Questions',
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
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
