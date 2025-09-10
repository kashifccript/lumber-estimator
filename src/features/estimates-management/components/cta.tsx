'use client';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modal/alert-modal';
import { useState } from 'react';
import { toast } from 'sonner';

interface CallToActionProps {
  projectName?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export const CallToAction = ({
  projectName = 'Downtown Office Renovation',
  onApprove,
  onReject
}: CallToActionProps) => {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Estimate approved successfully!');
      onApprove?.();
      setShowApproveModal(false);
    } catch (error) {
      toast.error('Failed to approve estimate');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Estimate rejected successfully!');
      onReject?.();
      setShowRejectModal(false);
    } catch (error) {
      toast.error('Failed to reject estimate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Approve Modal */}
      <AlertModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleApprove}
        loading={loading}
        title='Approve Estimate'
        description={`Are you sure you want to approve this estimate for ${projectName}? This will finalize the project budget and move it to active status.`}
        confirmText='Approve Estimate'
        cancelText='Cancel'
        variant='approve'
      />

      {/* Reject Modal */}
      <AlertModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
        loading={loading}
        title='Reject Estimate'
        description={`Are you sure you want to reject this estimate for ${projectName}?`}
        confirmText='Reject Estimate'
        cancelText='Cancel'
        variant='reject'
      />

      <div className='flex flex-row justify-end gap-2'>
        <Button
          variant='reject'
          size='md'
          onClick={() => setShowRejectModal(true)}
        >
          Reject
        </Button>
        <Button
          variant='approve'
          size='md'
          onClick={() => setShowApproveModal(true)}
        >
          Approve Estimate
        </Button>
      </div>
    </>
  );
};
