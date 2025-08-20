'use client';
import { CreateEstimateModal } from '@/components/modal/create-estimate-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function Heading() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    setTimeout(() => {
      setShowCreateModal(false);
      window.location.href = '/dashboard/estimation-details';
    }, 3000);
  };
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-secondary text-2xl font-semibold'>
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
