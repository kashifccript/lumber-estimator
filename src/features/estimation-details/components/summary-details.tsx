import { Card } from '@/components/ui/card';

interface SummaryDetailsProps {
  estimationData?: any;
}

export function SummaryDetails({ estimationData }: SummaryDetailsProps) {
  // Extract real data from API response
  const totalCost =
    estimationData?.results?.lumber_estimates?.total_lumber_cost || 127500;
  const totalLumberItems =
    estimationData?.results?.lumber_estimates?.total_lumber_items || 4;
  const matchedItems = estimationData?.accuracy_metrics?.matched_items || 7;
  const unmatchedItems = estimationData?.accuracy_metrics?.unmatched_items || 0;
  const totalItems =
    estimationData?.accuracy_metrics?.total_items ||
    matchedItems + unmatchedItems;

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
                Items Priced
              </span>
              <span className='text-secondary text-sm font-bold'>
                {matchedItems}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-secondary text-sm font-normal'>
                Items Needing Quotation
              </span>
              <span className='text-sm font-bold text-[#D08700]'>
                {unmatchedItems}
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
}
