'use client';

import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Plus, Printer, Send } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { downloadFile } from '@/lib/download';
import { IconButtonWithTooltip } from '@/components/shared/icon-button-with-tooltip';
import { IconFileTypePdf, IconFileTypeXls } from '@tabler/icons-react';

type QuotationActionBarProps = {
  onAddNewItem?: () => void;
  className?: string;
  quotationId: number;
  quotation: any;
};

export function QuotationActionBar({
  onAddNewItem,
  className,
  quotationId,
  quotation
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
      {/* // PDF button */}
      <IconButtonWithTooltip
        icon={<IconFileTypePdf />}
        tooltip={
          quotation.length === 0
            ? 'No quotations available to export'
            : 'Export as PDF'
        }
        onClick={handleExportPdf}
        disabled={quotation.length === 0}
      />
      {/* // Excel button */}
      <IconButtonWithTooltip
        icon={<IconFileTypeXls />}
        tooltip={
          quotation.length === 0
            ? 'No quotations available to export'
            : 'Export as Excel'
        }
        onClick={handleExportCsv}
        disabled={quotation.length === 0}
      />
      {/* // Print button */}
      <IconButtonWithTooltip
        icon={<Printer className='h-5 w-5 text-gray-600' />}
        tooltip={
          quotation.length === 0
            ? 'No quotations available to print'
            : 'Print Page'
        }
        onClick={handlePrint}
        disabled={quotation.length === 0}
      />
      <Button onClick={onAddNewItem} variant='primary' size='secondary'>
        <Plus />
        Create New Item
      </Button>
    </div>
  );
}
