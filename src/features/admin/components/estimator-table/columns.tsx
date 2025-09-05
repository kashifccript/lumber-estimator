'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Contractor } from '../../types/contractor';
import { Estimator } from '../../types/estimator';

interface ColumnsProps {
  onRefresh: () => void;
}

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<Estimator>[] => [
  {
    accessorKey: 'name',
    header: 'Estimator',
    cell: ({ row }) => {
      const contractor = row.original;
      return (
        <div className='flex items-center'>
          <div className='ml-3'>
            <div className='text-sm font-medium text-gray-900'>
              {contractor.name}
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
    accessorKey: 'approved',
    header: 'Approved Questions',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'pending',
    header: 'Pending Questions',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'rejected',
    header: 'Rejected',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
