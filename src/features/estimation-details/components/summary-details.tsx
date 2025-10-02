import { Card } from '@/components/ui/card';

export function SummaryDetails({ data }: { data: any }) {
  console.log("DATA.........", data)
  // Handle new API response format
  const totalCost = data?.total_cost || 0;
  const items = data?.items || [];

  // Count items priced (has valid numeric price and database match found)
  const itemsPriced = items.filter((item: any) => {
    // Check if item has database match
    const hasDatabaseMatch = item.database_match_found === 1;
    
    // Check if item has valid numeric prices (not "Quotation needed" string and > 0)
    const hasValidPrice = 
      (typeof item.estimated_unit_price === 'number' && item.estimated_unit_price > 0) ||
      (typeof item.estimated_cost === 'number' && item.estimated_cost > 0);
    
    // Check if prices are not "Quotation needed" strings
    const notQuotationNeeded = 
      item.estimated_unit_price !== 'Quotation needed' &&
      item.estimated_cost !== 'Quotation needed';
    
    return hasDatabaseMatch && hasValidPrice && notQuotationNeeded;
  }).length;

  // Count items needing quotation (no database match OR contains "Quotation needed" OR cost is 0)
  const itemsNeedingQuotation = items.filter((item: any) => {
    // Check if item has no database match
    const noDatabaseMatch = item.database_match_found === 0;
    
    // Check if any field contains "Quotation needed"
    const hasQuotationNeeded = 
      item.estimated_unit_price === 'Quotation needed' ||
      item.estimated_cost === 'Quotation needed' ||
      item.category === 'Quotation needed' ||
      item.dimensions === 'Quotation needed' ||
      item.sku === 'Quotation not available';
    
    // Check if cost is 0 or null
    const hasZeroOrNullCost = 
      item.estimated_cost === 0 ||
      item.estimated_cost === null ||
      item.estimated_unit_price === 0 ||
      item.estimated_unit_price === null;
    
    return noDatabaseMatch || hasQuotationNeeded || hasZeroOrNullCost;
  }).length;

  const totalItems = data?.total_items_count || items.length;

  return (
    <Card className='bg-white'>
      <div className='bg-background rounded-lg p-5'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <div className='flex-1 space-y-2.5'>
            <h3 className='text-secondary text-xl font-semibold sm:text-2xl'>
              Summary
            </h3>
            <div className='space-y-2'>
              <p className='text-secondary text-sm font-normal'>
                Total Estimated Cost
              </p>
              <p className='text-secondary text-2xl sm:text-[32px] font-semibold'>
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
                {itemsPriced}
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
              <span className='text-secondary text-sm sm:text-base font-semibold'>
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
