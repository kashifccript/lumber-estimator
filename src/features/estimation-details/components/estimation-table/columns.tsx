import { ColumnDef } from '@tanstack/react-table';

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
  costPerUnit: string;
  status: 'approved' | 'pending' | 'rejected' | 'quotation-needed';
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
    accessorKey: 'costPerUnit',
    header: 'Cost Per Unit'
  },
  {
    accessorKey: 'cost',
    header: 'Estimated Cost'
  },

  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => {
  //     const item = row.original;
  //     return <StatusBadge status={item.status}>{item.status}</StatusBadge>;
  //   }
  // },
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
