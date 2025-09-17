import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export interface Item {
  id: string | number;
  name: string;
  sku: string;
  unit: string;
  cost: string;
}

export const getItemColumns = (onRefresh: () => void): ColumnDef<Item>[] => [
  {
    accessorKey: 'name',
    header: 'Item Name'
  },
  {
    accessorKey: 'sku',
    header: 'SKU/ID'
  },
  {
    accessorKey: 'unit',
    header: 'Unit'
  },
  {
    accessorKey: 'cost',
    header: 'Cost'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
