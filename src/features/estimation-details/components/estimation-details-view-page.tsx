'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import { AddItemModal } from '@/components/modal/add-estimation-modal';
import { EstimationActionBar } from './estimation-action-bar';
import { SummaryDetails } from './summary-details';
import { DataTable } from './estimation-table';
import { Item, itemColumns } from './estimation-table/columns';
import { Breadcrumb } from '@/components/breadcrumbs';

export default function EstimationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimationData, setEstimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load estimation data from localStorage
    const storedData = localStorage.getItem('current_estimation');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        console.log('Loaded estimation data:', data);
        setEstimationData(data);

        // Convert API data to table items
        const apiItems: Item[] = [];

        // Check if we have lumber specs from the API
        if (data.results?.lumber_estimates?.detailed_lumber_specs?.length > 0) {
          // Use detailed lumber specs - CORRECTED DATA MAPPING
          data.results.lumber_estimates.detailed_lumber_specs.forEach(
            (spec: any, index: number) => {
              apiItems.push({
                id: spec.database_info?.item_id || `lumber-${index}`,
                name: spec.item_name || `Lumber Item ${index + 1}`,
                sku:
                  spec.database_info?.item_id ||
                  `LBR-${String(index + 1).padStart(3, '0')}`,
                quantity: `${spec.quantity?.needed || 0} ${spec.quantity?.unit || 'units'}`,
                cost: spec.pricing?.total_price
                  ? `$ ${Number(spec.pricing.total_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : 'N/A',
                status:
                  spec.sourcing?.database_match === 'Available'
                    ? ('approved' as const)
                    : ('quotation-needed' as const),
                contractor: spec.sourcing?.recommended_contractor
                  ? {
                      name: spec.sourcing.recommended_contractor,
                      avatar: '/assets/icons/building.svg'
                    }
                  : null
              });
            }
          );
        } else if (data.results?.detailed_items?.length > 0) {
          // Use detailed items if lumber specs not available
          data.results.detailed_items.forEach((item: any, index: number) => {
            const needsQuotation =
              item.unit_price === 'Quotation needed' ||
              item.total_price === 'Quotation needed';

            apiItems.push({
              id: item.item_id || `item-${index}`,
              name: item.item_name || item.description || `Item ${index + 1}`,
              sku: item.item_id || `ITM-${String(index + 1).padStart(3, '0')}`,
              quantity: `${item.quantity_needed || 0} ${item.unit || 'units'}`,
              cost: needsQuotation
                ? 'Quotation Needed'
                : item.total_price
                  ? `$ ${Number(item.total_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : 'N/A',
              status: needsQuotation
                ? ('quotation-needed' as const)
                : ('approved' as const),
              contractor: item.recommended_contractor
                ? {
                    name: item.recommended_contractor,
                    avatar: '/assets/icons/building.svg'
                  }
                : null
            });
          });
        } else {
          // Create a summary item if no detailed items
          apiItems.push({
            id: 'summary-1',
            name: `${data.project_name} - Lumber Estimation`,
            sku: 'EST-001',
            quantity: `${data.results?.lumber_estimates?.total_lumber_items || 0} items`,
            cost: `$ ${(data.results?.lumber_estimates?.total_lumber_cost || 0).toLocaleString()}`,
            status: 'approved' as const,
            contractor: null
          });
        }

        setItems(apiItems);
      } catch (error) {
        console.error('Error parsing estimation data:', error);
        // Keep empty items array if parsing fails
      }
    }
    setIsLoading(false);
  }, []);

  const handleAddItem = (newItem: { name: string; quantity: string }) => {
    const item: Item = {
      id: Date.now().toString(),
      name: newItem.name,
      sku: 'NEW-01',
      quantity: newItem.quantity,
      status: 'pending',
      cost: '$ 0'
    };
    setItems([...items, item]);
  };

  const handleSubmitEstimate = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 20000));

      // Redirect to estimates page after successful submission
      router.push('/dashboard/estimates');
    } catch (error) {
      console.error('Error submitting estimate:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className='flex flex-1 items-center justify-center'>
          <div className='text-lg'>Loading estimation details...</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 pb-6'>
        <div className='flex items-center justify-between'>
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Estimation Details', active: true }
            ]}
          />

          {/* Action Bar */}
          <EstimationActionBar
            onAddNewItem={() => setShowAddItemModal(true)}
            onSubmitEstimate={handleSubmitEstimate}
          />
        </div>

        {/* Table */}
        <DataTable columns={itemColumns} data={items} />

        {/* Summary */}
        <SummaryDetails estimationData={estimationData} />
      </div>

      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        onSubmit={handleAddItem}
      />
    </PageContainer>
  );
}
