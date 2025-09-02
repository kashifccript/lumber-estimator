import PageContainer from '@/components/layout/page-container';
import EstimateListing from './estimate-listing';
import Heading from './heading';

export default function EstimatesViewPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 pb-6'>
        <Heading />
        {/* Data Table */}

        <EstimateListing />
      </div>
    </PageContainer>
  );
}
