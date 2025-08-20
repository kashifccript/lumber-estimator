import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Contractor {
  name: string;
  avatar: string;
}

export interface Item {
  id: string | number;
  name: string;
  sku: string;
  quantity: number;
  cost: string;
  contractor?: Contractor | null;
}

export const itemColumns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: 'Item Name'
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
    header: 'Estimated Cost'
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
        <span className='text-sm text-[#101828]'>___</span>
      );
    }
  }
  // {
  //   id: 'actions',
  //   header: 'Actions',
  //   cell: ({ row }) => {
  //     const item = row.original;
  //     return (
  //       <div className='flex items-center gap-2'>
  //         <Button
  //           size='sm'
  //           variant='ghost'
  //           onClick={() => console.log('View', item)}
  //         >
  //           <Eye className='h-4 w-4' />
  //         </Button>
  //         <Button
  //           size='sm'
  //           variant='ghost'
  //           onClick={() => console.log('Edit', item)}
  //         >
  //           <Pencil className='h-4 w-4' />
  //         </Button>
  //         <Button
  //           size='sm'
  //           variant='ghost'
  //           onClick={() => console.log('Delete', item)}
  //         >
  //           <Trash className='h-4 w-4 text-red-500' />
  //         </Button>
  //       </div>
  //     );
  //   }
  // }
];
