'use client';

import { IconButtonWithTooltip } from '@/components/shared/icon-button-with-tooltip';
import { Button } from '@/components/ui/button';
import { downloadFile } from '@/lib/download';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

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

  const isEmpty = quotation.length === 0;

  return (
    <div className={`flex items-center justify-end gap-1.5 ${className ?? ''}`}>
      <IconButtonWithTooltip
        src='/assets/icons/pdf.png'
        alt='Export PDF'
        tooltip={
          isEmpty ? 'No quotations available to export' : 'Export as PDF'
        }
        onClick={handleExportPdf}
        disabled={isEmpty}
      />

      <IconButtonWithTooltip
        src='/assets/icons/csv.png'
        alt='Export Excel'
        tooltip={
          isEmpty ? 'No quotations available to export' : 'Export as Excel'
        }
        onClick={handleExportCsv}
        disabled={isEmpty}
      />
      {/* // Print button */}
      <IconButtonWithTooltip
        src='/assets/icons/printer.png'
        alt='Print'
        tooltip={isEmpty ? 'No quotations available to print' : 'Print Page'}
        onClick={handlePrint}
        disabled={isEmpty}
      />
      <Button onClick={onAddNewItem} variant='primary' size='secondary'>
        <Plus />
        Create New Item
      </Button>
    </div>
  );
}
