'use client';
import PageContainer from '@/components/layout/page-container';
import { CustomTable } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import { Plus, Printer } from 'lucide-react';
import Image from 'next/image';

export default function QuotationsViewPage() {
  const handleExportPdf = () => {
    console.log('Export PDF');
  };
  const handleExportCsv = () => {
    console.log('Export CSV');
  };
  const onPrint = () => {
    console.log('Print');
  };

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-3'>
        <div className='flex justify-between gap-2'>
          <h2 className='text-2xl font-medium'>Quotations</h2>
          <div className={`flex items-center justify-end gap-1.5`}>
            <Button onClick={handleExportPdf} variant='icon' size='icon'>
              <Image
                src='/assets/icons/pdf.png'
                alt='PDF'
                width={20}
                height={20}
                unoptimized
                quality={100}
              />
            </Button>
            <Button variant='icon' size='icon' onClick={handleExportCsv}>
              <Image
                src='/assets/icons/csv.png'
                alt='CSV'
                width={20}
                height={20}
                unoptimized
                quality={100}
              />
            </Button>
            <Button variant='icon' size='icon' onClick={onPrint}>
              <Printer className='h-5 w-5 text-gray-600' />
            </Button>
          </div>
        </div>
        <CustomTable data={[]} columns={[]} itemsPerPage={10} />
      </div>
    </PageContainer>
  );
}
