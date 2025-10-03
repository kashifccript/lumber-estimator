import { Item } from '../components/estimation-table/columns';

export const transformApiDataToTableItems = (apiData: any): Item[] => {
  console.log("apiData", apiData.items);
  // Handle the new API response format (from /projects/{id})
  if (apiData.items && Array.isArray(apiData.items)) {
    return apiData.items.map((item: any, index: number) => {
      // Determine status based on item properties
      let status: 'approved' | 'pending' | 'rejected' | 'quotation-needed' =
        'approved';

      if (
        item.status === 'quotation_needed' ||
        item.database_match === 'Quotation needed'
      ) {
        status = 'quotation-needed';
      } else if (item.status === 'manual_added') {
        status = 'pending';
      } else if (item.status === 'available') {
        status = 'approved';
      }

      const costPerUnit = (item.unit_price && typeof item.unit_price === 'number') 
      ? `$ ${item.unit_price % 1 === 0 ? item.unit_price : item.unit_price.toFixed(2)}` 
      : (item.estimated_unit_price && typeof item.estimated_unit_price === 'number')
      ? `$ ${item.estimated_unit_price % 1 === 0 ? item.estimated_unit_price : item.estimated_unit_price.toFixed(2)}`
      : 'Quotation needed'; 

      const estimatedPrice = (item.total_price && typeof item.total_price === 'number')
        ? `$ ${item.total_price % 1 === 0 ? item.total_price : item.total_price.toFixed(2)}`
        : (item.estimated_cost && typeof item.estimated_cost === 'number')
        ? `$ ${item.estimated_cost % 1 === 0 ? item.estimated_cost : item.estimated_cost.toFixed(2)}`
        : 'Quotation needed'; 
     
      
      


      // Format quantity
      const quantity = item.quantity_needed
        ? `${item.quantity_needed} ${item.unit}`
        : `${item.quantity} ${item.unit}`;

      return {
        id: item.item_id || item.id || `item-${index}`,
        name: item.item_name || 'Unknown Item',
        sku: item.sku || 'N/A',
        quantity,
        status,
        costPerUnit,
        cost: estimatedPrice,
        contractor: {
          name:
            item.contractor_name ||
            item.recommended_contractor ||
            'No contractor assigned',
          avatar:
            'https://api.builder.io/api/v1/image/assets/TEMP/c621edd36a0654de255120825ca63122a262c93a?width=64'
        }
      };
    });
  }

  // Fallback for old API format (from upload response)
  if (apiData.results?.lumber_estimates?.detailed_lumber_specs) {
    return apiData.results.lumber_estimates.detailed_lumber_specs.map(
      (item: any, index: number) => {
        const totalCost = item.pricing.total_price || 0;
        const quantity = item.quantity.needed || 0;

        // Use unit_price from API if available, otherwise calculate
        let costPerUnit = '$0';
        if (typeof item.pricing.unit_price === 'number') {
          costPerUnit = `$ ${item.pricing.unit_price.toFixed(2)}`;
        } else if (quantity > 0) {
          costPerUnit = `$ ${(totalCost / quantity).toFixed(2)}`;
        }

        return {
          id: item.item_id || `api-item-${index}`,
          name: item.item_name || 'Unknown Item',
          sku: item.sku || 'N/A',
          quantity: `${quantity} ${item.quantity.unit || ''}`,
          status: 'approved' as const,
          cost: `$ ${totalCost.toLocaleString()}`,
          costPerUnit,
          contractor: {
            name: item.sourcing.available_contractors[0] || 'No contractor',
            avatar:
              'https://api.builder.io/api/v1/image/assets/TEMP/c621edd36a0654de255120825ca63122a262c93a?width=64'
          }
        };
      }
    );
  }

  // Return empty array if no items found
  return [];
};
