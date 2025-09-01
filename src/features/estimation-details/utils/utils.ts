import { Item } from "../components/estimation-table/columns";

export const transformApiDataToTableItems = (apiData: any): Item[] => {
  const tableData = apiData.results.lumber_estimates.detailed_lumber_specs.map(
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

  return tableData;
};
