import { Card } from '@/components/ui/card';

interface SummarySectionProps {
  data?: any;
}

export const SummarySection = ({ data }: SummarySectionProps) => {
  // Calculate statistics from API data
  const totalCost = data?.total_cost || 0;
  const items = data?.items || [];

  // Count items based on database_match flag
  const itemsQuoted = items.filter(
    (item: any) => item.database_match === 'Available'
  ).length;

  const itemsNeedingQuotation = items.filter(
    (item: any) => item.database_match !== 'Available'
  ).length;

  const totalItems = data?.total_items_count || items.length;

  return (
    <Card>
      <div className='bg-background rounded-lg p-5'>
        <div className='flex flex-row gap-4'>
          <div className='flex-1 space-y-2.5'>
            <h3 className='text-secondary text-2xl font-semibold'>Summary</h3>
            <div className='space-y-2'>
              <p className='text-secondary text-sm font-normal'>
                Total Estimated Cost
              </p>
              <p className='text-secondary text-[32px] font-semibold'>
                ${totalCost.toLocaleString()}
              </p>
            </div>
          </div>

          <div className='flex-1 space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-secondary text-sm font-normal'>
                Items Quoted
              </span>
              <span className='text-secondary text-sm font-bold'>
                {itemsQuoted}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-secondary text-sm font-normal'>
                Items Needing Quotation
              </span>
              <span className='text-sm font-bold text-[#D08700]'>
                {itemsNeedingQuotation}
              </span>
            </div>
            <div className='border-secondary/17 flex items-center justify-between border-t pt-3'>
              <span className='text-secondary text-base font-semibold'>
                Total Items
              </span>
              <span className='text-secondary text-base font-bold'>
                {totalItems}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
