import PageContainer from '@/components/layout/page-container';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Suspense } from 'react';
import {UserListing} from './user-listing';

export default function AdminDashboardViewPage() {
  return (
    <div>
      <PageContainer>
        <div className='flex flex-1 flex-col gap-3 pb-6'>
          {/* <Heading /> */}
          {/* Data Table */}
          <Suspense
            fallback={
              <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
            }
          >
            <UserListing />
          </Suspense>
        </div>
      </PageContainer>
    </div>
  );
}
