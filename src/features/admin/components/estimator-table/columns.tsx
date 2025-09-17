'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
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
          {/* <div className='ml-3'>
            <div className='text-sm font-medium text-gray-900'>
              {contractor.name}
            </div>
          </div> */}
          <div className='flex items-center gap-3'>
              <div
                className='h-8 w-8 rounded-full bg-cover bg-center'
                style={{
                  backgroundImage: `url(${contractor.profile_picture || contractor.avatar || '/assets/icons/profile.png'})`
                }}
              />
              <div className=''>
                <div className='text-sm font-medium text-gray-900'>
                  {contractor.name}
                </div>
              </div>
            </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'total_projects',
    header: '    Total Estimates',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'active_projects',
    header: 'Approved Estimates',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'pending_projects',
    header: 'Pending Estimates',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'rejected_projects',
    header: 'Rejected',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
