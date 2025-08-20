'use client';

import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Plus, Printer, Send } from 'lucide-react';
import Image from 'next/image';

type EstimationActionBarProps = {
  onAddNewItem?: () => void;
  onSubmitEstimate?: () => void;
  onExportPdf?: () => void;
  onExportCsv?: () => void;
  onPrint?: () => void;
  className?: string;
};

export function EstimationActionBar({
  onAddNewItem,
  onSubmitEstimate,
  onExportPdf,
  onExportCsv,
  onPrint,
  className
}: EstimationActionBarProps) {
  return (
    <div className={`flex items-center justify-end gap-1.5 ${className ?? ''}`}>
      <Button onClick={onExportPdf} variant='icon' size='icon'>
        <Image
          src='/assets/icons/pdf.png'
          alt='PDF'
          width={20}
          height={20}
          unoptimized
          quality={100}
        />
      </Button>
      <Button variant='icon' size='icon' onClick={onExportCsv}>
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
      <Button onClick={onAddNewItem} variant='secondary' size='secondary'>
        <Plus />
        Add New Item
      </Button>
      <Button onClick={onSubmitEstimate} variant='primary' size='secondary'>
        <Send />
        Submit Estimate
      </Button>
    </div>
  );
}
