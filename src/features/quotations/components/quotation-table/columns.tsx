import { ColumnDef } from '@tanstack/react-table';

export interface Item {
  id: string | number;
  name: string;
  sku: string;
  unit: string;
  cost: string;
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
    accessorKey: 'unit',
    header: 'Unit'
  },
  {
    accessorKey: 'cost',
    header: 'Cost'
  },
 
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
