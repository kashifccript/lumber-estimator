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
import { getUserQuotations } from '../actions/actions';
import { useSession } from 'next-auth/react';

export default function QuotationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [quotationData, setQuotationData] = useState<Item[]>([]);
  // Use dynamic breadcrumbs
  const breadcrumbs = useBreadcrumbs();
  const { data: session } = useSession();
  const userId = Number(session?.user?.user?.id);

  useEffect(() => {
    const loadQuotations = async () => {
      if (!userId) return;

      setIsLoadingData(true);
      const res = await getUserQuotations(userId);

      if (res.success && res.data?.quotations) {
        const mappedData: Item[] = res.data.quotations.map((q: any) => ({
          id: `Q${q.quotation_id}`, 
          name: q.quotation_name,
          sku: q.client_name, // using client_name as sku (since mock data had SKU-like value)
          unit: q.status, // using status as unit (adjust if needed)
          cost: `$${q.total_cost}`
        }));

        setQuotationData(mappedData);
      } else {
        console.error(res.message);
        setQuotationData([]);
      }

      setIsLoadingData(false);
    };

    loadQuotations();
  }, [userId]);

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
          <QuotationActionBar onAddNewItem={() => setShowAddItemModal(true)} />
        </div>

        {/* Conditional Table Rendering */}
        {isLoadingData ? (
          <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
        ) : (
          <QuotationDataTable data={quotationData} columns={itemColumns} />
        )}
      </div>

      <CreateQuotationModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
      />
    </PageContainer>
  );
}
