'use client';
import PageContainer from '@/components/layout/page-container';
import { CustomTable } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import Image from 'next/image';
import { createColumns } from './quotation-tables/columns';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useContractorApis } from '@/features/admin/actions/contractor';
import { toast } from 'sonner';
import { Quotation } from '@/features/admin/types/contractor';
import { downloadFile } from '@/lib/download';

export default function QuotationsViewPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { fetchAllQuotationsbyUser } = useContractorApis();
  const userId = String(session?.user?.user.id);
  const userName = String(session?.user?.user.username);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetchAllQuotationsbyUser(userId);
      setQuotations(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    try {
      await downloadFile(
        `/contractors/contractors/${userId}/quotations/export/pdf`,
        `quotations-user-${userName}.pdf`
      );
      toast.success('PDF exported successfully!');
    } catch {
      toast.error('Failed to export PDF');
    }
  };

  const handleExportCsv = async () => {
    try {
      await downloadFile(
        `/contractors/contractors/${userId}/quotations/export/xlsx`,
        `quotations-user-${userName}.xlsx`
      );
      toast.success('Excel exported successfully!');
    } catch {
      toast.error('Failed to export Excel');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    fetchQuotations();
  }, [session]);

  const handleRefresh = () => {
    fetchQuotations();
  };

  const columns = createColumns({ onRefresh: handleRefresh });

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-3'>
        <div className='flex items-center justify-between gap-2'>
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
            <Button variant='icon' size='icon' onClick={handlePrint}>
              <Printer className='h-5 w-5 text-gray-600' />
            </Button>
          </div>
        </div>
        <CustomTable data={quotations} columns={columns} itemsPerPage={10} />
      </div>
    </PageContainer>
  );
}
