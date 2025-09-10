'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type Quotation = {
  id: string;
  updatedOn: string;
  items: number;
  totalCost: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

interface ColumnsProps {
  onRefresh: () => void;
}

const statusClasses: Record<Quotation['status'], string> = {
  Pending: 'bg-[#E3A00833] text-[#E3A008]',
  Approved: 'bg-[#00A42E33] text-[#00A42E]',
  Rejected: 'bg-[#C81E1E33] text-[#C81E1E]'
};

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<Quotation>[] => [
  { accessorKey: 'id', header: 'Quotation ID' },
  { accessorKey: 'updatedOn', header: 'Updated On' },
  {
    accessorKey: 'items',
    header: 'Items',
    cell: ({ cell }) => <span>{cell.getValue<number>()} Items</span>
  },
  {
    accessorKey: 'totalCost',
    header: 'Total Cost',
    cell: ({ cell }) => <span>$ {cell.getValue<string>()}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ cell }) => {
      const status = cell.getValue<Quotation['status']>();
      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-2 text-sm font-medium ${statusClasses[status]}`}
        >
          {status}
        </span>
      );
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
