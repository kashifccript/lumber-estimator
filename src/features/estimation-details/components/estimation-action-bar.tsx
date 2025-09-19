'use client';

import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Plus, Printer, Send } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

type EstimationActionBarProps = {
  projectId?: string;
  onAddNewItem?: () => void;
  onSubmitEstimate?: () => void;
  onExportCsv?: () => void;
  onPrint?: () => void;
  className?: string;
};

export function EstimationActionBar({
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

  return (
    <div
      className={`flex w-full flex-col items-end justify-end gap-1.5 md:flex-row md:items-center ${className ?? ''}`}
    >
      <div className='flex flex-row gap-1.5'>
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
      >
        <Send />
        Submit Estimate
      </Button>
    </div>
  );
}
