'use client';

import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Plus, Printer, Send } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { IconButtonWithTooltip } from '@/components/shared/icon-button-with-tooltip';

type EstimationActionBarProps = {
  estimations: any;
  projectId?: string;
  onAddNewItem?: () => void;
  onSubmitEstimate?: () => void;
  onExportCsv?: () => void;
  onPrint?: () => void;
  className?: string;
};

export function EstimationActionBar({
  estimations,
  projectId,
  onAddNewItem,
  onSubmitEstimate,
  onExportCsv,
  onPrint,
  className
}: EstimationActionBarProps) {
  const { data: session } = useSession();

  const handleExportPdf = async () => {
    if (!projectId) {
      toast.error('No project ID available for PDF export');
      return;
    }

    if (!session?.user?.access_token) {
      toast.error('Authentication token not found');
      return;
    }

    try {
      // Create form data for application/x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('project_id', projectId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/lumber/export/pdf`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/pdf',
            Authorization: `Bearer ${session.user.access_token}`
          },
          body: formData.toString()
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || 'Failed to export PDF');
        return;
      }

      // Get the filename from the response headers
      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : `estimation_${projectId}_${new Date().toISOString().split('T')[0]}.pdf`;

      // Create blob from response
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  const handleExportCsv = async () => {
    if (!projectId) {
      toast.error('No project ID available for Excel export');
      return;
    }

    if (!session?.user?.access_token) {
      toast.error('Authentication token not found');
      return;
    }

    try {
      // Create form data for application/x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('project_id', projectId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/lumber/export/excel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            Authorization: `Bearer ${session.user.access_token}`
          },
          body: formData.toString()
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || 'Failed to export Excel file');
        return;
      }

      // Get the filename from the response headers
      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : `estimation_${projectId}_${new Date().toISOString().split('T')[0]}.xlsx`;

      // Create blob from response
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Excel file exported successfully');
    } catch (error) {
      console.error('Error exporting Excel file:', error);
      toast.error('Failed to export Excel file');
    }
  };

  const isEmpty = estimations.length === 0;

  return (
    <div
      className={`flex w-full flex-col items-end justify-end gap-1.5 md:flex-row md:items-center ${className ?? ''}`}
    >
      <div className='flex flex-row gap-1.5'>
        <IconButtonWithTooltip
          src='/assets/icons/pdf.png'
          alt='Export PDF'
          tooltip={
            isEmpty ? 'No estimations available to export' : 'Export as PDF'
          }
          onClick={handleExportPdf}
          disabled={isEmpty}
        />

        <IconButtonWithTooltip
          src='/assets/icons/csv.png'
          alt='Export Excel'
          tooltip={
            isEmpty ? 'No estimations available to export' : 'Export as Excel'
          }
          onClick={handleExportCsv}
          disabled={isEmpty}
        />
        {/* // Print button */}
        <IconButtonWithTooltip
          src='/assets/icons/printer.png'
          alt='Print'
          tooltip={isEmpty ? 'No estimations available to print' : 'Print Page'}
          onClick={onPrint}
          disabled={isEmpty}
        />
      </div>

      <Button
        onClick={onAddNewItem}
        variant='secondary'
        size='secondary'
        className='w-full md:w-fit'
      >
        <Plus />
        Add New Item
      </Button>
      <Button
        onClick={onSubmitEstimate}
        variant='primary'
        size='secondary'
        className='w-full md:w-fit'
        disabled={estimations.length === 0}
      >
        <Send />
        Submit Estimate
      </Button>
    </div>
  );
}
