'use client';
import { Breadcrumb } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CustomTable } from '@/components/shared/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { createColumns, Estimate } from './estimate-table/columns';
import { SummarySection } from './summary-section';
import { Button } from '@/components/ui/button';
import { CallToAction } from './cta';

export default function EstimatesManagementDetails() {
  // Mock data based on the image
  const mockData: Estimate[] = [
    {
      id: 'EST-001',
      itemName: 'Concrete Foundation (Grade A)',
      skuId: 'PLY-34',
      quantity: 120,
      unitPrice: '127,344',
      total: '127,344',
      status: 'Quoted'
    },
    {
      id: 'EST-002',
      itemName: 'Steel Structural Beams I-Beam 12"',
      skuId: 'PLY-34',
      quantity: 45,
      unitPrice: '127,344',
      total: '127,344',
      status: 'Quoted'
    },
    {
      id: 'EST-003',
      itemName: 'Premium Glass Curtain Wall System',
      skuId: 'PLY-34',
      quantity: 124,
      unitPrice: '127,344',
      total: '127,344',
      status: 'Quoted'
    },
    {
      id: 'EST-004',
      itemName: 'Electrical Conduit & Wiring',
      skuId: 'PLY-34',
      quantity: 24,
      unitPrice: '127,344',
      total: '127,344',
      status: 'Quoted'
    },
    {
      id: 'EST-005',
      itemName: 'Concrete Foundation (Grade A)',
      skuId: 'PLY-34',
      quantity: 120,
      unitPrice: '127,344',
      total: '127,344',
      status: 'Quotation Needed'
    },
    {
      id: 'EST-006',
      itemName: 'Steel Structural Beams I-Beam 12"',
      skuId: 'PLY-34',
      quantity: 120,
      unitPrice: '127,344',
      total: '127,344',
      status: 'Quoted'
    },
    {
      id: 'EST-007',
      itemName: 'Premium Glass Curtain Wall System',
      skuId: 'PLY-34',
      quantity: 120,
      unitPrice: '127,344',
      total: '127,344',
      status: 'Quoted'
    },
    {
      id: 'EST-008',
      itemName: 'Electrical Conduit & Wiring',
      skuId: 'PLY-34',
      quantity: 120,
      unitPrice: '127,344',
      total: '127,344',
      status: 'Quoted'
    }
  ];

  const columns = createColumns({
    onRefresh: () => {}
  });
  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <Breadcrumb
              items={[
                {
                  label: 'All Estimates',
                  href: '/dashboard/contractor/estimates-management'
                },
                {
                  label: 'Estimates Management'
                }
              ]}
            />
            <div className='relative w-full max-w-sm'>
              {/* Search Icon */}
              <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#292D32]' />

              {/* Input */}
              <Input
                type='text'
                placeholder='Search'
                className='h-[48px] rounded-[8px] border border-[#8896AB33] py-2 pr-4 pl-10 placeholder:text-[#292D32] focus-visible:ring-0 focus-visible:ring-offset-0'
              />
            </div>
          </div>
          {/* Profile Section */}
          <div className='flex items-center justify-between gap-3 rounded-sm bg-white px-10 py-4'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-4'>
                <div className='relative h-[90px] w-[90px] overflow-hidden rounded-full bg-gray-200'>
                  <Image
                    width={90}
                    height={90}
                    src={'/assets/icons/profile.png'}
                    alt='Profile Avatar'
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>

              <div className='flex-1'>
                <h3 className='text-lg font-semibold'>{'Profile'}</h3>
                <p className='mb-2 text-[12px] font-[400] text-[#1F1F1F]'>
                  {'email'}
                </p>
                <div className='flex flex-row gap-3'>
                  <Badge
                    variant='secondary'
                    className={`h-[22px] rounded-[2px] bg-[#3B81F5] px-2 text-white capitalize`}
                  >
                    {'role'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <p className='text-lg font-semibold'>Submitted Date</p>
              <span className='text-xs font-normal'>15/01/2025</span>
            </div>
          </div>

          {/* Custom Table */}
          <CustomTable data={mockData} columns={columns} itemsPerPage={10} />

          {/* SummarySection */}
          <SummarySection />

          {/* CTA */}
          <CallToAction />
        </div>
      </div>
    </PageContainer>
  );
}
