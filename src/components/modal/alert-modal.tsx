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
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
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
    >
      <div className='flex items-center justify-end space-x-2 pt-6'>
        <Button
          disabled={loading}
          variant={'reject'}
          size={'md'}
          onClick={onClose}
        >
          {cancelText}
        </Button>
        <Button
          disabled={loading}
          size={'md'}
          variant={
            variant === 'approve'
              ? 'approve'
              : variant === 'reject'
                ? 'reject'
                : 'primary'
          }
          className={`${variant === 'reject' ? 'bg-[#C81E1E] text-white hover:bg-[#C81E1E]/90' : ''}`}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
