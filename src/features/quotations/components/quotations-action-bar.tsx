'use client';

import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Plus, Printer, Send } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

type QuotationActionBarProps = {
  onAddNewItem?: () => void;
  className?: string;
};

export function QuotationActionBar({
  onAddNewItem,
  className
}: QuotationActionBarProps) {
  const handleExportPdf = async () => {
    alert('Export PDF');
  };
  const handleExportCsv = async () => {
    alert('Export CSV');
  };
  const handlePrint = async () => {
    alert('Print');
  };

  return (
    <div className={`flex items-center justify-end gap-1.5 ${className ?? ''}`}>
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
      <Button variant='icon' size='icon' onClick={handlePrint}>
        <Printer className='h-5 w-5 text-gray-600' />
      </Button>
      <Button onClick={onAddNewItem} variant='primary' size='secondary'>
        <Plus />
        Create New Item
      </Button>
    </div>
  );
}
