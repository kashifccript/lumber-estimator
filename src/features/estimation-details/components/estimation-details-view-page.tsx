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
import { addManualItem, fetchProjectData } from '../actions/estimation';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';

export default function EstimationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [projectData, setProjectData] = useState<any>(null);
  const router = useRouter();
  const { currentEstimationData } = useEstimationStore();
  // Use dynamic breadcrumbs
  const breadcrumbs = useBreadcrumbs();

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);

      // Get project ID from current estimation data
      const projectId = currentEstimationData?.project_id;

      if (projectId) {
        try {
          // Fetch project data from API
          const response = await fetchProjectData(projectId.toString());

          if (response && response.project_id) {
            setProjectData(response);

            // Transform API data to table items
            const tableItems = transformApiDataToTableItems(response);
            setItems(tableItems);
          } else {
            toast.error('Failed to load project data');
          }
        } catch (error) {
          toast.error('Error loading project data');
        }
      } else {
        toast.error('No project ID found. Please upload a PDF first.');
      }

      setIsLoadingData(false);
    };

    loadData();
  }, [currentEstimationData?.project_id]);

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
        // Use unit_price from API response if available
        const totalCost = result.estimated_cost || 0;
        let costPerUnit = '$0';

        if (typeof result.estimated_unit_price === 'number') {
          costPerUnit = `$ ${result.estimated_unit_price.toFixed(2)}`;
        } else if (typeof result.unit_price === 'number') {
          costPerUnit = `$ ${result.unit_price.toFixed(2)}`;
        }

        // Use the rich data from API response instead of form data
        const item: Item = {
          id: result.item_id,
          name: result.item_name,
          sku: result.sku_id,
          quantity: `${result.quantity} ${result.unit}`,
          status: 'approved', // API processed it successfully
          cost: `$ ${totalCost.toLocaleString()}`,
          costPerUnit
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
      toast.success('Estimate submitted successfully');
      router.push('/dashboard/estimates');
    } catch (error) {
      console.error('Error submitting estimate:', error);
      setIsSubmitting(false);
      toast.error('Error submitting estimate');
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 pb-6'>
        <div className='flex items-center justify-between'>
          {/* Dynamic Breadcrumb */}
          <Breadcrumb
            items={breadcrumbs.map((crumb, index) => ({
              label: crumb.title,
              href: crumb.link,
              active: index === breadcrumbs.length - 1
            }))}
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

        {/* Summary - Use projectData instead of currentEstimationData */}
        <SummaryDetails data={projectData} />
      </div>

      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        onSubmit={handleAddItem}
      />
    </PageContainer>
  );
}
