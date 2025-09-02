'use client';

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
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
  flexRender
} from '@tanstack/react-table';
import { useState } from 'react';

interface EstimateTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  itemsPerPage?: number;
}

export function EstimateTable<TData, TValue>({
  data,
  columns,
  itemsPerPage = 5
}: EstimateTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: itemsPerPage
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  });

  const startIndex = table.getState().pagination.pageIndex * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  return (
    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
      <Table>
        <TableHeader>
          <TableRow>
            {table
              .getHeaderGroups()
              .map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))
              )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className=''>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className='flex h-[64px] items-center justify-between border-t border-gray-200 bg-[#F1F5F9] p-6'>
        <span className='text-secondary text-sm font-medium'>
          Showing {startIndex + 1}-{endIndex} of {data.length} entries
        </span>
        <div className='flex items-center gap-2'>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='flex h-8 w-8 items-center justify-center rounded-sm bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <ChevronLeft className='h-4 w-4 text-[#141B34]' />
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='flex h-8 w-8 items-center justify-center rounded-sm bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <ChevronRight className='h-4 w-4 text-[#141B34]' />
          </Button>
        </div>
      </div>
    </div>
  );
}
