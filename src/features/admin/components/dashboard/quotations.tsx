import PageContainer from '@/components/layout/page-container';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Suspense } from 'react';
import { QuotationListing } from '../quotation-table/quotation-list';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

export default function UsersView() {
  return (
    <div>
      <div className='flex flex-row justify-between py-4'>
        <div className='text-[24px] font-semibold text-[#1F1F1F]'>
          Quotations
        </div>
        <Button
          variant={'outline'}
          className='w-full max-w-[129px] rounded-[8px] border-[#E2624B] text-[#E2624B] hover:text-[#E2624B]'
        >
          <Icon
            icon='meteor-icons:arrow-up-right'
            color='#E2624B'
            className='h-6 w-6'
          />
          View All
        </Button>
      </div>
      <QuotationListing />
    </div>
  );
}
