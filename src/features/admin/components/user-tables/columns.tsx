'use client';
import { User } from '../../types/user';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

interface ColumnsProps {
  onRefresh: () => void;
}

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: 'first_name',
    header: 'User Name',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className='flex items-center'>
          <div className='h-8 w-8 flex-shrink-0'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700 capitalize'>
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </div>
          </div>
          <div className='ml-3'>
            <div className='text-sm font-medium text-gray-900'>
              {user.first_name} {user.last_name}
            </div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'created_at',
    header: 'Date',
    cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      return (
        <div>
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      );
    }
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ cell }) => {
      const role = cell.getValue<string>();
      const roleColors = {
        admin: 'text-red-800',
        contractor: 'text-[#3DD598]',
        estimator: 'text-[#3B81F5]'
      };

      return (
        <span
          className={`font-bold capitalize ${roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'}`}
        >
          {role}
        </span>
      );
    }
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
