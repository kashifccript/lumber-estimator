'use client';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modal/alert-modal';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  approveEstimate,
  rejectEstimate
} from '@/features/contractor/actions/estimates';

interface CallToActionProps {
  projectName?: string;
  projectId?: string;
  onApprove?: () => void;
  onReject?: () => void;
  refetch?: () => void;
}

export const CallToAction = ({
  projectName = 'Downtown Office Renovation',
  projectId,
  onApprove,
  onReject,
  refetch
}: CallToActionProps) => {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!projectId) {
      toast.error('Project ID is required');
      return;
    }

    try {
      setLoading(true);
      const result = await approveEstimate(projectId);

      if (result.success) {
        toast.success(result.message || 'Estimate approved successfully!');
        onApprove?.();
        setShowApproveModal(false);
        if (refetch) refetch();
      } else {
        toast.error(result.message || 'Failed to approve estimate');
      }
    } catch (error) {
      toast.error('Failed to approve estimate');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!projectId) {
      toast.error('Project ID is required');
      return;
    }

    try {
      setLoading(true);
      const result = await rejectEstimate(
        projectId,
        'Estimate rejected by contractor',
        'Estimate does not meet requirements'
      );

      if (result.success) {
        toast.success(result.message || 'Estimate rejected successfully!');
        onReject?.();
        setShowRejectModal(false);
        if (refetch) refetch();
      } else {
        toast.error(result.message || 'Failed to reject estimate');
      }
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
        isEstimate
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
        isEstimate
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
