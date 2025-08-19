'use client';
import { AddItemModal } from '@/components/modal/add-estimation-modal';
import { FileSpreadsheet, FileText, Plus, Printer, Send } from 'lucide-react';
import { useState } from 'react';

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
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-7xl'>
        <div className='space-y-6'>
          {/* Breadcrumb */}
          {/* <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Estimation Details', active: true }
            ]}
          /> */}

          {/* Action Bar */}
          <div className='flex items-center justify-end gap-3'>
            <div className='flex items-center gap-3'>
              <button className='flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white transition-colors hover:bg-gray-50'>
                <FileText className='h-5 w-5 text-gray-600' />
              </button>
              <button className='flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white transition-colors hover:bg-gray-50'>
                <FileSpreadsheet className='h-5 w-5 text-gray-600' />
              </button>
              <button className='flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white transition-colors hover:bg-gray-50'>
                <Printer className='h-5 w-5 text-gray-600' />
              </button>
            </div>
            <button
              onClick={() => setShowAddItemModal(true)}
              className='flex items-center gap-3 rounded-lg border border-[#E2624B] px-6 py-3 text-[#E2624B] transition-colors hover:bg-[#E2624B]/5'
            >
              <Plus className='h-6 w-6' />
              Add New Item
            </button>
            <button className='flex items-center gap-3 rounded-lg bg-[#E2624B] px-6 py-3 text-white transition-colors hover:bg-[#d14d2e]'>
              <Send className='h-6 w-6' />
              Submit Estimate
            </button>
          </div>

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
          <div className='rounded-xl bg-white p-6'>
            <div className='rounded-lg bg-gray-50 p-6'>
              <div className='flex gap-8'>
                <div className='flex-1 space-y-4'>
                  <h3 className='text-2xl font-semibold text-[#1F1F1F]'>
                    Summary
                  </h3>
                  <div className='space-y-2'>
                    <p className='text-sm text-[#1F1F1F]'>
                      Total Estimated Cost
                    </p>
                    <p className='text-3xl font-semibold text-[#1F1F1F]'>
                      $127,500
                    </p>
                  </div>
                </div>
                <div className='flex-1 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-[#1F1F1F]'>Items Priced</span>
                    <span className='text-sm font-bold text-[#1F1F1F]'>23</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-[#1F1F1F]'>
                      Items Needing Quotation
                    </span>
                    <span className='text-sm font-bold text-orange-600'>8</span>
                  </div>
                  <div className='flex items-center justify-between border-t border-[#1F1F1F]/17 pt-3'>
                    <span className='text-base font-semibold text-[#1F1F1F]'>
                      Total Items
                    </span>
                    <span className='text-base font-bold text-[#1F1F1F]'>
                      31
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        onSubmit={handleAddItem}
      />
    </div>
  );
}
