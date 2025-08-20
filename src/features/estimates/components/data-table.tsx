import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
  };
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pagination
}: DataTableProps<T>) {
  const itemsPerPage = pagination?.itemsPerPage || 5;
  const startIndex = pagination ? (pagination.page - 1) * itemsPerPage : 0;
  const endIndex = pagination ? startIndex + itemsPerPage : data.length;
  const displayData = pagination ? data.slice(startIndex, endIndex) : data;

  return (
    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
      <Table>
        <TableHeader>
          <TableRow className='bg-[#F1F5F9]'>
            {columns.map((column) => (
              <TableHead key={column.key as string}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key as string}>
                  {column.cell
                    ? column.cell(item)
                    : (item[column.key as keyof T] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && (
        <div className='flex h-[64px] items-center justify-between border-t border-gray-200 bg-[#F1F5F9] p-6'>
          <span className='text-secondary text-sm font-medium'>
            Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of{' '}
            {data.length} entries
          </span>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className='flex h-8 w-8 items-center justify-center rounded-sm bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <ChevronLeft className='h-4 w-4 text-[#141B34]' />
            </Button>
            <Button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className='flex h-8 w-8 items-center justify-center rounded-sm bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <ChevronRight className='h-4 w-4 text-[#141B34]' />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
