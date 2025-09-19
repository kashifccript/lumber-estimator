'use client';
import { CreateEstimateModal } from '@/components/modal/create-estimate-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { usePdfUpload } from '@/hooks/use-pdf-upload';

export default function Heading() {
  const { showCreateModal, setShowCreateModal, handleFileUpload } =
    usePdfUpload();
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-secondary text-base font-semibold sm:text-2xl'>
        Recent Estimates
      </h1>
      <Button
        onClick={() => setShowCreateModal(true)}
        variant='secondary'
        size='secondary'
      >
        <Plus className='size-6' />
        Create New Estimate
      </Button>

      <CreateEstimateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
}
