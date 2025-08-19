'use client';
import PageContainer from '@/components/layout/page-container';
import { AddItemModal } from '@/components/modal/add-estimation-modal';
import { useState } from 'react';
import { EstimationActionBar } from './estimation-action-bar';
import { SummaryDetails } from './summary-details';

interface EstimationItem {
  id: string;
  name: string;
  sku: string;
  quantity: string;
  cost: string;
  contractor?: {
    name: string;
    avatar: string;
  };
}

const mockData: EstimationItem[] = [
  {
    id: '1',
    name: 'Concrete Foundation (Grade A)',
    sku: 'PLY-34',
    quantity: '150 cubic yards',
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
    cost: '$ 127,344'
  },
  {
    id: '3',
    name: 'Premium Glass Curtain Wall System',
    sku: 'PLY-34',
    quantity: '2,200 sq ft',
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
  const [items, setItems] = useState<EstimationItem[]>(mockData);

  const handleAddItem = (newItem: { name: string; quantity: string }) => {
    const item: EstimationItem = {
      id: Date.now().toString(),
      name: newItem.name,
      sku: 'NEW-01',
      quantity: newItem.quantity,
      cost: '$ 0'
    };
    setItems([...items, item]);
  };

  return (
    <PageContainer>
      <div className='mx-10 flex flex-1 flex-col gap-3 pb-6'>
        {/* Breadcrumb */}
        {/* <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Estimation Details', active: true }
            ]}
          /> */}

        {/* Action Bar */}
        <EstimationActionBar onAddNewItem={() => setShowAddItemModal(true)} />

        {/* Table */}
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-100'>
                <tr>
                  <th className='min-w-[300px] px-6 py-4 text-left text-sm font-medium text-[#1F1F1F]'>
                    Item Name
                  </th>
                  <th className='min-w-[120px] px-6 py-4 text-left text-sm font-medium text-[#1F1F1F]'>
                    SKU/ID
                  </th>
                  <th className='min-w-[150px] px-6 py-4 text-left text-sm font-medium text-[#1F1F1F]'>
                    Quantity
                  </th>
                  <th className='min-w-[120px] px-6 py-4 text-left text-sm font-medium text-[#1F1F1F]'>
                    Estimated Cost
                  </th>
                  <th className='min-w-[150px] px-6 py-4 text-left text-sm font-medium text-[#1F1F1F]'>
                    Contractor
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {items.map((item) => (
                  <tr key={item.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-5 text-sm text-[#1F1F1F]'>
                      {item.name}
                    </td>
                    <td className='px-6 py-5 text-sm text-[#1F1F1F]'>
                      {item.sku}
                    </td>
                    <td className='px-6 py-5 text-sm text-[#1F1F1F]'>
                      {item.quantity}
                    </td>
                    <td className='px-6 py-5 text-sm text-[#1F1F1F]'>
                      {item.cost}
                    </td>
                    <td className='px-6 py-5'>
                      {item.contractor ? (
                        <div className='flex items-center gap-3'>
                          <div
                            className='h-8 w-8 rounded-full bg-cover bg-center'
                            style={{
                              backgroundImage: `url(${item.contractor.avatar})`
                            }}
                          />
                          <span className='text-sm text-[#101828]'>
                            {item.contractor.name}
                          </span>
                        </div>
                      ) : (
                        <span className='text-sm text-[#101828]'>___</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
