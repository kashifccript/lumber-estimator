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
import { fetchProjectById } from '@/features/project-details/actions/project';
import { CustomTable } from '@/components/shared/table';

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

        // Use the rich data from API response instead of form data
        const item: Item = {
          id: result.item_id,
          name: result.item_name,
          sku: result.sku,
          quantity: `${result.quantity} ${result.unit}`,
          status: 'approved', // API processed it successfully
          cost: `$ ${result.estimated_unit_price.toLocaleString()}`,
          costPerUnit : result.estimated_unit_price,
          contractor: {name: result.contractor_name,
          avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/c621edd36a0654de255120825ca63122a262c93a?width=64'
          },
          
        };
        setItems([...items, item]);
                try {
                  const updatedProjectResponse = await fetchProjectById(projectId);
                  if (updatedProjectResponse && updatedProjectResponse.project_id) {
                    setProjectData(updatedProjectResponse);
                  }
                } catch (error) {
                  console.error('Error refreshing project data:', error);
                  // Don't show error toast for this as the main operation succeeded
                }

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
      router.push('/dashboard/estimator/estimates');
    } catch (error) {
      console.error('Error submitting estimate:', error);
      setIsSubmitting(false);
      toast.error('Error submitting estimate');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 overflow-hidden pb-6'>
        <div className='flex flex-col items-start justify-between gap-3 lg:flex-row lg:items-center'>
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
            estimations={items}
            projectId={currentEstimationData?.project_id}
            onAddNewItem={() => setShowAddItemModal(true)}
            onSubmitEstimate={handleSubmitEstimate}
            onPrint={handlePrint}
          />
        </div>

        {/* Conditional Table Rendering */}
        {isLoadingData ? (
          <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
        ) : (
          <CustomTable  itemsPerPage={10} columns={itemColumns} data={items} />
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
