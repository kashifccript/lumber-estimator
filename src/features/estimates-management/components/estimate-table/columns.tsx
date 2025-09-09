'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '../table/cell-action';

export type Estimate = {
  id: string;
  itemName: string;
  skuId: string;
  quantity: number;
  unitPrice: string;
  total: string;
  status: 'Quoted' | 'Quotation Needed';
};

interface ColumnsProps {
  onRefresh: () => void;
}

const statusClasses: Record<Estimate['status'], string> = {
  Quoted: 'bg-[#00A42E33] text-[#00A42E]',
  'Quotation Needed': 'bg-[#E3A00833] text-[#E3A008]'
};

export const createColumns = ({
  onRefresh
}: ColumnsProps): ColumnDef<Estimate>[] => [
  {
    accessorKey: 'itemName',
    header: 'Item Name'
  },
  {
    accessorKey: 'skuId',
    header: 'SKU/ID'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price'
  },
  {
    accessorKey: 'total',
    header: 'Total'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className='flex justify-start'>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status]}`}
          >
            {status}
          </span>
        </div>
      );
    }
  }
];
