'use client';
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
    accessorKey: 'name',
    header: 'Contractor',
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
    accessorKey: 'total_quotations',
    header: 'Total Quotations',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'approved_quotations',
    header: 'Approved Quotations',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'pending_quotations',
    header: 'Pending Questions',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'declined_quotations',
    header: 'Declined',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
