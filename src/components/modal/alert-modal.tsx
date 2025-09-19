'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'approve' | 'reject' | 'default';
  isEstimate?:boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  isEstimate,
  confirmText = 'Continue',
  cancelText = 'Cancel',
  variant = 'default'
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >{isEstimate ?
          <div className='flex items-center flex-col md:flex-row justify-end space-x-2 pt-6 px-1 gap-4'>
        <Button
          disabled={loading}
          variant={'reject'}
          onClick={onClose}
          className='w-full md:w-auto'
        >
          {cancelText}

        </Button>
        <Button
          disabled={loading}
          // size={'md'}
          variant={
            variant === 'approve'
              ? 'approve'
              : variant === 'reject'
                ? 'reject'
                : 'primary'
          }
          className={`w-full md:w-auto ${variant === 'reject' ? 'bg-[#C81E1E] text-white hover:bg-[#C81E1E]/90' : ''}`}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>:
      <div className='flex items-center justify-end space-x-2 pt-6 px-8'>
        <Button
          disabled={loading}
          variant={'reject'}
          onClick={onClose}
          className='w-auto'
        >
          {cancelText}

        </Button>
        <Button
          disabled={loading}
          // size={'md'}
          variant={
            variant === 'approve'
              ? 'approve'
              : variant === 'reject'
                ? 'reject'
                : 'primary'
          }
          className={`w-auto ${variant === 'reject' ? 'bg-[#C81E1E] text-white hover:bg-[#C81E1E]/90' : ''}`}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
}
    </Modal>
  );
};
