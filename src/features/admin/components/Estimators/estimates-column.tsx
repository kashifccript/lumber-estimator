'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '../estimator-table/cell-action';
import { EstimatorDetailsTable } from '../../types/estimator';
import StatusList from '@/components/shared/status-bar';

interface ColumnsProps {
  onRefresh: () => void;
}

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<any>[] => [
  {
    accessorKey: 'project_name',
    header: 'Project Name',
    cell: ({ row }) => {
      const estimator = row.original;
      return (
        <div className='flex items-center'>
          <div className='ml-3'>
            <div className='text-sm font-medium text-gray-900'>
              {estimator.project_name}
            </div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'items',
    header: 'Total Items',
    cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ cell }) => <div>${cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'statuses',
    header: 'Status Overview',
    cell: ({ row }) => {
      const statuses = row.original.statuses;
      return <StatusList statuses={statuses} />;
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
