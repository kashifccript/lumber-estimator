'use client';
import PageContainer from '@/components/layout/page-container';
import { AddItemModal } from '@/components/modal/add-estimation-modal';
import { useState } from 'react';
import { EstimationActionBar } from './estimation-action-bar';
import { SummaryDetails } from './summary-details';
import { DataTable } from './estimation-table';
import { Item, itemColumns } from './estimation-table/columns';
import { Breadcrumb } from '@/components/breadcrumbs';

const mockData: Item[] = [
  {
    id: '1',
    name: 'Concrete Foundation (Grade A)',
    sku: 'PLY-34',
    quantity: 150,
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
    quantity: 45,
    cost: '$ 127,344'
  },
  {
    id: '3',
    name: 'Premium Glass Curtain Wall System',
    sku: 'PLY-34',
    quantity: 2200,
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
    quantity: 24,
    cost: '$ 127,344',
    contractor: {
      name: 'Albert Flores',
      avatar:
        'https://api.builder.io/api/v1/image/assets/TEMP/a0f0d78e603192c6a2e8bb999f17e4ac994c0e1a?width=64'
    }
  }
];

export default function EstimationDetailsViewPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  // const [items, setItems] = useState<EstimationItem[]>(mockData);

  // const handleAddItem = (newItem: { name: string; quantity: string }) => {
  //   const item: EstimationItem = {
  //     id: Date.now().toString(),
  //     name: newItem.name,
  //     sku: 'NEW-01',
  //     quantity: newItem.quantity,
  //     cost: '$ 0'
  //   };
  //   setItems([...items, item]);
  // };

  return (
    <PageContainer>
      <div className='mx-10 flex flex-1 flex-col gap-3 pb-6'>
        <div className='flex items-center justify-between'>
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Estimation Details', active: true }
            ]}
          />

          {/* Action Bar */}
          <EstimationActionBar onAddNewItem={() => setShowAddItemModal(true)} />
        </div>

        {/* Table */}
        <DataTable columns={itemColumns} data={mockData} />

        {/* Summary */}
        <SummaryDetails />
      </div>

      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        // onSubmit={handleAddItem}
      />
    </PageContainer>
  );
}
