'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Item } from '@/features/admin/types/contractor';

interface ColumnsProps {
  onRefresh: () => void;
}

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<Item>[] => [
  {
    accessorKey: 'item_name',
    header: 'Item Name',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className='flex items-center'>
          <div className='h-8 w-8 flex-shrink-0'> {item.item_name}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'sku_id',
    header: 'SKU/ID',
    cell: ({ cell }) => <div>{cell.getValue<string>()} </div>
  },
  {
    accessorKey: 'total_cost',
    header: 'Quoted Cost',
    cell: ({ cell }) => <div>{`$ ${cell.getValue<string>()} `} </div>
  }
];
