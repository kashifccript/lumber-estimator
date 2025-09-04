'use client';
import { Estimate } from '../../types/estimate';
import { ColumnDef } from '@tanstack/react-table';
import { StatusProgress } from '../status-progress';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Estimate>[] = [
  {
    accessorKey: 'id',
    header: 'Estimate ID',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'name',
    header: 'Project Name',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'materials',
    header: 'Material',
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'total_cost',
    header: 'Total Cost',
    cell: ({ cell }) => <div>${cell.getValue<number>()?.toLocaleString()}</div>
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => <StatusProgress data={row.original.status} />
  // },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
