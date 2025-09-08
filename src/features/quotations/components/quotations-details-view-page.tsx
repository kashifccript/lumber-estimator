'use client';
import { Breadcrumb } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CreateQuotationModal } from '@/components/modal/create-quotation-modal';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { useEffect, useState } from 'react';
import { QuotationDataTable } from './quotation-table';
import { Item, itemColumns } from './quotation-table/columns';
import { QuotationActionBar } from './quotations-action-bar';
import { addItemToQuotation, getUserQuotations } from '../actions/actions';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function QuotationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [quotationData, setQuotationData] = useState<Item[]>([]);
  const breadcrumbs = useBreadcrumbs();
  const { data: session } = useSession();
  const userId = Number(session?.user?.user?.id);
  const quotationId = sessionStorage.getItem('quotation_id');
  const quotationIdStr = Number(quotationId);

  const loadQuotationItems = async () => {
    if (!quotationIdStr) return;
    setIsLoadingData(true);

    const res = await getUserQuotations(quotationIdStr);

    if (res.success && res.data?.items) {
      const mappedData: Item[] = res.data.items.map((item: any) => ({
        id: `I${item.item_id}`,
        name: item.item_name,
        sku: item.sku_id,
        unit: item.unit,
        cost: `$${item.total_cost}`
      }));

      setQuotationData(mappedData);
    } else {
      console.error(res.message);
      setQuotationData([]);
    }

    setIsLoadingData(false);
  };

  useEffect(() => {
    loadQuotationItems();
  }, []);

  const handleAddItem = async (data: {
    itemName: string;
    sku?: string;
    unitOfMeasure: string;
    cost: string;
  }) => {
    if (!quotationIdStr) {
      throw new Error('Quotation ID is required');
    }

    const res = await addItemToQuotation(quotationIdStr, {
      item_name: data.itemName,
      sku: data.sku || '',
      unit: data.unitOfMeasure,
      unit_of_measure: data.unitOfMeasure,
      cost: parseFloat(data.cost)
    });

    if (res.success) {
      toast.success('Item added successfully!');
      // Refetch data after successful addition
      await loadQuotationItems();
    } else {
      throw new Error(res.message);
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 pb-6'>
        <div className='flex items-center justify-between'>
          <Breadcrumb
            items={breadcrumbs.map((crumb, index) => ({
              label: crumb.title,
              href: crumb.link,
              active: index === breadcrumbs.length - 1
            }))}
          />

          <QuotationActionBar onAddNewItem={() => setShowAddItemModal(true)} />
        </div>

        {isLoadingData ? (
          <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
        ) : (
          <QuotationDataTable data={quotationData} columns={itemColumns} />
        )}
      </div>

      <CreateQuotationModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        mode='add-item'
        quotationId={quotationIdStr}
        onSubmit={handleAddItem}
        onSuccess={() => {
          console.log('Item added successfully');
        }}
        onError={(error) => {
          console.error('Error adding item:', error);
        }}
      />
    </PageContainer>
  );
}
