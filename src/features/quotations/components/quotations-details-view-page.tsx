'use client';
import { Breadcrumb } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CreateQuotationModal } from '@/components/modal/create-quotation-modal';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { useState } from 'react';
import { DataTable } from '@/components/ui/table/data-table';
import { Item, itemColumns } from './quotation-table/columns';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { QuotationDataTable } from './quotation-table';
import { QuotationActionBar } from './quotations-action-bar';

export default function QuotationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  // Use dynamic breadcrumbs
  const breadcrumbs = useBreadcrumbs();

  const mockQuotationData: Item[] = [
    {
      id: 'Q001',
      name: 'Premium Oak Flooring',
      sku: 'OAK-PREM-001',
      unit: 'sq ft',
      cost: '$12.50'
    },
    {
      id: 'Q002',
      name: 'Concrete Mix 4000 PSI',
      sku: 'CONC-4000-50',
      unit: 'cubic yard',
      cost: '$125.00'
    },
    {
      id: 'Q003',
      name: 'Steel Rebar #4',
      sku: 'REBAR-4-20',
      unit: 'linear ft',
      cost: '$2.85'
    },
    {
      id: 'Q004',
      name: 'Drywall 1/2 inch',
      sku: 'DW-12-48',
      unit: 'sheet',
      cost: '$18.75'
    },
    {
      id: 'Q005',
      name: 'Insulation R-19',
      sku: 'INS-R19-15',
      unit: 'sq ft',
      cost: '$0.85'
    },
    {
      id: 'Q006',
      name: 'Electrical Wire 12 AWG',
      sku: 'WIRE-12-100',
      unit: 'linear ft',
      cost: '$1.25'
    },
    {
      id: 'Q007',
      name: 'PVC Pipe 4 inch',
      sku: 'PVC-4-10',
      unit: 'linear ft',
      cost: '$8.50'
    },
    {
      id: 'Q008',
      name: 'Roofing Shingles',
      sku: 'ROOF-ASPH-33',
      unit: 'sq ft',
      cost: '$3.25'
    },
    {
      id: 'Q009',
      name: 'Paint Primer',
      sku: 'PAINT-PRIM-1',
      unit: 'gallon',
      cost: '$28.00'
    },
    {
      id: 'Q010',
      name: 'Hardware Kit',
      sku: 'HW-KIT-STD',
      unit: 'each',
      cost: '$45.00'
    }
  ];

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
          <QuotationDataTable data={mockQuotationData} columns={itemColumns} />
        )}
      </div>

      <CreateQuotationModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
      />
    </PageContainer>
  );
}
