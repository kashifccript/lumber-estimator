// src/components/modal/create-quotation-modal.tsx
'use client';
import { Modal } from '@/components/ui/modal';

interface CreateQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateQuotationModal({
  isOpen,
  onClose
}: CreateQuotationModalProps) {
  return (
    <Modal
      title='Add Custom Item'
      description='Add a construction material or services specific to your business'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className=' '>
        <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
          Hello Contractor! 👋
        </h2>
        <p className='text-gray-600'>
          This is your quotation creation modal. More features coming soon!
        </p>
      </div>
    </Modal>
  );
}
