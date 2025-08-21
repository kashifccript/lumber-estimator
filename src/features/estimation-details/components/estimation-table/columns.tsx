import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../status-badge';

interface Contractor {
  name: string;
  avatar: string;
}

export interface Item {
  id: string | number;
  name: string;
  sku: string;
  quantity: string;
  cost: string;
  status: 'approved' | 'pending' | 'rejected' | 'quotation-needed';
  contractor?: Contractor | null;
}

export const itemColumns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: 'Item Name',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className='max-w-xs'>
          <p className='truncate font-medium text-gray-900'>{item.name}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'sku',
    header: 'SKU/ID'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'cost',
    header: 'Estimated Cost',
    cell: ({ row }) => {
      const cost = row.original.cost;
      return <span className='font-medium text-green-700'>{cost}</span>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const item = row.original;
      return <StatusBadge status={item.status}>{item.status}</StatusBadge>;
    }
  },
  {
    accessorKey: 'contractor',
    header: 'Contractor',
    cell: ({ row }) => {
      const contractor = row.original.contractor;
      return contractor ? (
        <div className='flex items-center gap-3'>
          <div
            className='h-8 w-8 rounded-full bg-cover bg-center'
            style={{
              backgroundImage: `url(${contractor.avatar})`
            }}
          />
          <span className='text-sm text-[#101828]'>{contractor.name}</span>
        </div>
      ) : (
        <span className='text-sm text-gray-400'>Unassigned</span>
      );
    }
  }
];
