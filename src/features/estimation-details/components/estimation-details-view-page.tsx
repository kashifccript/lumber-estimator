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
import { transformApiDataToTableItems } from '../utils/utils';
import { toast } from 'sonner';
import { addManualItem } from '../actions/estimation';

export default function EstimationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const router = useRouter();
  const { currentEstimationData } = useEstimationStore();

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

  const handleAddItem = async (newItem: {
    name: string;
    quantity: number;
    unit: string;
    sku?: string;
  }) => {
    const projectId = currentEstimationData?.project_id;

    if (!projectId) {
      toast.error('No project ID found. Please upload a PDF first.');
      return;
    }

    try {
      const result = await addManualItem(
        projectId,
        newItem.name,
        newItem.quantity,
        newItem.unit,
        newItem.sku
      );

      if (result.success) {
        // Use the rich data from API response instead of form data
        const item: Item = {
          id: result.item_id,
          name: result.item_name,
          sku: result.sku_id,
          quantity: `${result.quantity} ${result.unit}`,
          status: 'approved', // API processed it successfully
          cost: `$ ${result.estimated_cost?.toLocaleString() || '0'}`
        };
        setItems([...items, item]);

        toast.success(result.message);
      } else {
        toast.error(result.message || 'Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('An error occurred while adding the item');
    }
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
