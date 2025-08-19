'use client';

import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Plus, Printer, Send } from 'lucide-react';

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
      <Button onClick={onExportPdf} variant='icon'>
        <FileText className='h-5 w-5 text-gray-600' />
      </Button>
      <Button variant='icon' onClick={onExportCsv}>
        <FileSpreadsheet className='h-5 w-5 text-gray-600' />
      </Button>
      <Button variant='icon' onClick={onPrint}>
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
