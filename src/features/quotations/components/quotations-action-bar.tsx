'use client';

import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Plus, Printer, Send } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { downloadFile } from '@/lib/download';

type QuotationActionBarProps = {
  onAddNewItem?: () => void;
  className?: string;
  quotationId: number;
};

export function QuotationActionBar({
  onAddNewItem,
  className,
  quotationId
}: QuotationActionBarProps) {
  const handleExportPdf = async () => {
    try {
      await downloadFile(
        `/contractors/quotations/${quotationId}/export/pdf`,
        `quotation-${quotationId}.pdf`
      );
      toast.success('PDF exported successfully!');
    } catch {
      toast.error('Failed to export PDF');
    }
  };
  const handleExportCsv = async () => {
    try {
      await downloadFile(
        `/contractors/quotations/${quotationId}/export/xlsx`,
        `quotation-${quotationId}.csv`
      );
      toast.success('CSV exported successfully!');
    } catch {
      toast.error('Failed to export CSV');
    }
  };
  const handlePrint = () => {
    window.print();
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
