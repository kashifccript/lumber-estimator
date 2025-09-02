import { Item } from '../components/estimation-table/columns';

export const transformApiDataToTableItems = (apiData: any): Item[] => {
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

      // Format cost - handle both string and number values
      let cost = '$0';
      if (typeof item.total_price === 'number') {
        cost = `$ ${item.total_price.toLocaleString()}`;
      } else if (typeof item.estimated_cost === 'number') {
        cost = `$ ${item.estimated_cost.toLocaleString()}`;
      } else if (item.total_price === 'Quotation needed') {
        cost = 'Quotation needed';
      }

      // Format quantity
      const quantity = item.quantity_needed
        ? `${item.quantity_needed} ${item.unit}`
        : `${item.quantity} ${item.unit}`;

      return {
        id: item.item_id || item.id || `item-${index}`,
        name: item.item_name || 'Unknown Item',
        sku: item.sku || item.item_id || 'N/A',
        quantity,
        status,
        cost,
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
      (item: any, index: number) => ({
        id: item.item_id || `api-item-${index}`,
        name: item.item_name || 'Unknown Item',
        sku: item.sku || 'N/A',
        quantity: `${item.quantity.needed || 0} ${item.quantity.unit || ''}`,
        status: 'approved' as const,
        cost: `$ ${item.pricing.total_price?.toLocaleString() || '0'}`,
        contractor: {
          name: item.sourcing.available_contractors[0] || 'No contractor',
          avatar:
            'https://api.builder.io/api/v1/image/assets/TEMP/c621edd36a0654de255120825ca63122a262c93a?width=64'
        }
      })
    );
  }

  // Return empty array if no items found
  return [];
};
