'use client';
import { Breadcrumb } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CreateQuotationModal } from '@/components/modal/create-quotation-modal';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { useEffect, useMemo, useState } from 'react';
import { QuotationDataTable } from './quotation-table';
import { Item, getItemColumns } from './quotation-table/columns';
import { QuotationActionBar } from './quotations-action-bar';
import {
  addItemToQuotation,
  getUserQuotations,
  updateQuotationItem
} from '../actions/actions';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function QuotationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [quotationData, setQuotationData] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const breadcrumbs = useBreadcrumbs();

  // const { data: session } = useSession();
  // const userId = Number(session?.user?.user?.id);
  const params = useParams();
  const quotationIdStr = Number(params?.id);

  const loadQuotationItems = async () => {
    if (!quotationIdStr) return;
    setIsLoadingData(true);

    const res = await getUserQuotations(quotationIdStr);

    if (res.success && res.data?.items) {
      const mappedData: Item[] = res.data.items.map((item: any) => ({
        id: `${item.item_id}`,
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
  }, [quotationIdStr]);

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return quotationData;
    return quotationData.filter((item) => {
      const name = item.name?.toString().toLowerCase() || '';
      const sku = item.sku?.toString().toLowerCase() || '';
      return name.includes(query) || sku.includes(query);
    });
  }, [quotationData, searchQuery]);

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
        <div className='flex items-center justify-between gap-3'>
          <Breadcrumb
            items={breadcrumbs.map((crumb, index) => ({
              label: crumb.title,
              href: crumb.link,
              active: index === breadcrumbs.length - 1
            }))}
          />

          <div className='flex items-center gap-2'>
            {/* Search box */}
            <div className='relative'>
              <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#292D32]' />
              <Input
                type='text'
                placeholder='Search by Name or SKU/ID'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='h-[48px] w-72 rounded-[8px] border border-[#8896AB33] py-2 pr-4 pl-10 placeholder:text-[#292D32] focus-visible:ring-0 focus-visible:ring-offset-0'
              />
            </div>

            <QuotationActionBar
              quotation={quotationData}
              onAddNewItem={() => setShowAddItemModal(true)}
              quotationId={quotationIdStr}
            />
          </div>
        </div>

        {isLoadingData ? (
          <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
        ) : (
          <QuotationDataTable
            data={filteredData}
            columns={getItemColumns(loadQuotationItems)}
          />
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
