'use client';
import PageContainer from '@/components/layout/page-container';
import { CustomTable } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import { Plus, Printer } from 'lucide-react';
import Image from 'next/image';
import { createColumns } from './quotation-tables/columns';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useContractorApis } from '@/features/admin/actions/contractor';
import { toast } from 'sonner';
import { Quotation } from '@/features/admin/types/contractor';
import { downloadFile } from '@/lib/download';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { IconButtonWithTooltip } from '@/components/shared/icon-button-with-tooltip';
import { CreateQuotationModal } from '@/components/modal/create-quotation-modal';
import { createQuotation } from '@/features/quotations/actions/actions';
import { useRouter } from 'next/navigation';

export default function QuotationsViewPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { fetchAllQuotationsbyUser } = useContractorApis();
  const userId = String(session?.user?.user.id);
  const userName = String(session?.user?.user.username);
  const userIdNum = Number(session?.user?.user?.id);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

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

  const handleCreateQuotation = async (data: {
    itemName: string;
    sku?: string;
    unitOfMeasure: string;
    cost: string;
  }) => {
    const res = await createQuotation(userIdNum, {
      item_name: data.itemName,
      sku: data.sku || '',
      unit: data.unitOfMeasure,
      unit_of_measure: data.unitOfMeasure,
      cost: parseFloat(data.cost)
    });

    if (res.success) {
      toast.success('Quotation created successfully!');
    } else {
      toast.error(res.message || 'Failed to create quotation');
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, [session]);

  const handleRefresh = () => {
    fetchQuotations();
  };

  const columns = createColumns({ onRefresh: handleRefresh });

  const isEmpty = quotations.length === 0;

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-3'>
        <div className='flex items-center justify-between gap-2'>
          <h2 className='text-2xl font-medium'>Quotations</h2>
          <div className={`flex items-center justify-end gap-1.5`}>
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
                isEmpty
                  ? 'No quotations available to export'
                  : 'Export as Excel'
              }
              onClick={handleExportCsv}
              disabled={isEmpty}
            />
            {/* // Print button */}
            <IconButtonWithTooltip
              src='/assets/icons/printer.png'
              alt='Print'
              tooltip={
                isEmpty ? 'No quotations available to print' : 'Print Page'
              }
              onClick={handlePrint}
              disabled={isEmpty}
            />

            <Button
              onClick={() => setShowCreateModal(true)}
              variant='primary'
              size='secondary'
            >
              <Plus className='size-6' />
              Create Quotation
            </Button>
          </div>
        </div>
        <CustomTable data={quotations} columns={columns} itemsPerPage={10} />
        <CreateQuotationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          mode='create'
          onSubmit={handleCreateQuotation}
          onSuccess={async () => {
            await fetchQuotations();
          }}
          onError={(error) => {
            console.error('Error creating quotation:', error);
          }}
        />
      </div>
    </PageContainer>
  );
}
