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
    accessorKey: 'username',
    header: 'User Name',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className='flex items-center'>
          {/* {user.profile_picture || user.avatar ? ( */}
            <div className='flex items-center gap-3'>
              <div
                className='h-8 w-8 rounded-full bg-cover bg-center'
                style={{
                  backgroundImage: `url(${user.profile_picture || user.avatar || '/assets/icons/profile.png'})`
                }}
              />
              <div className=''>
                <div className='text-sm font-medium text-gray-900'>
                  {user.username}
                </div>
              </div>
            </div>
          {/* ) : (
            <span className='text-sm text-[#101828]'>___</span>
          )} */}
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
    accessorKey: 'date',
    header: 'Date',
    // cell: ({ cell }) => {
    //   const date = new Date(cell.getValue<string>());
    //   return (
    //     <div>
    //       {date.toLocaleDateString('en-US', {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric'
    //       })}
    //     </div>
    //   );
    // }
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ cell }) => {
      const role = cell.getValue<string>();
      const roleColors = {
        Admin: 'text-red-800',
        Contractor: 'text-[#3DD598]',
        Estimator: 'text-[#3B81F5]'
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
        Pending: 'bg-[#E3A00833] text-[#E3A008]',
        Approved: 'bg-[#00A42E33] text-[#00A42E]',
        Rejected: 'bg-[#C81E1E33] text-[#C81E1E]'
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
