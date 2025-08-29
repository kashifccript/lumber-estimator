'use client';
import { Breadcrumb } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { AddItemModal } from '@/components/modal/add-estimation-modal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EstimationActionBar } from './estimation-action-bar';
import { DataTable } from './estimation-table';
import { Item, itemColumns } from './estimation-table/columns';
import { SummaryDetails } from './summary-details';
import { useEstimationStore } from '@/stores/estimation-store';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

const mockData: Item[] = [
  {
    id: '1',
    name: 'Concrete Foundation (Grade A)',
    sku: 'PLY-34',
    quantity: '150 cubic yards',
    status: 'approved',
    cost: '$ 127,344',
    contractor: {
      name: 'Dianne Russell',
      avatar:
        'https://api.builder.io/api/v1/image/assets/TEMP/c621edd36a0654de255120825ca63122a262c93a?width=64'
    }
  },
  {
    id: '2',
    name: 'Steel Structural Beams I-Beam 12"',
    sku: 'PLY-34',
    quantity: '45 Units',
    status: 'quotation-needed',
    cost: '$ 127,344'
  },
  {
    id: '3',
    name: 'Premium Glass Curtain Wall System',
    sku: 'PLY-34',
    quantity: '2,200 sq ft',
    status: 'pending',
    cost: '$ 127,344',
    contractor: {
      name: 'Albert Flores',
      avatar:
        'https://api.builder.io/api/v1/image/assets/TEMP/a0f0d78e603192c6a2e8bb999f17e4ac994c0e1a?width=64'
    }
  },
  {
    id: '4',
    name: 'Electrical Conduit & Wiring',
    sku: 'PLY-34',
    quantity: '24 units',
    status: 'rejected',
    cost: '$ 127,344',
    contractor: {
      name: 'Albert Flores',
      avatar:
        'https://api.builder.io/api/v1/image/assets/TEMP/a0f0d78e603192c6a2e8bb999f17e4ac994c0e1a?width=64'
    }
  }
];

// Transform API data to table format
const transformApiDataToTableItems = (apiData: any): Item[] => {
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

export default function EstimationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const router = useRouter();
  const { currentEstimationData, clearEstimationData } = useEstimationStore();

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      if (currentEstimationData) {
        try {
          const tableItems = transformApiDataToTableItems(
            currentEstimationData
          );
          setItems(tableItems);
        } catch (error) {
          console.error('Error processing API data:', error);
        }
      }
      setIsLoadingData(false);
    };

    loadData();
  }, [currentEstimationData]);

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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to estimates page after successful submission
      router.push('/dashboard/estimates');
    } catch (error) {
      console.error('Error submitting estimate:', error);
      setIsSubmitting(false);
    }
  };

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

        {/* Conditional Table Rendering */}
        {isLoadingData ? (
          <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
        ) : (
          <DataTable columns={itemColumns} data={items} />
        )}

        {/* Summary */}
        <SummaryDetails data={currentEstimationData} />
      </div>

      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        onSubmit={handleAddItem}
      />
    </PageContainer>
  );
}
