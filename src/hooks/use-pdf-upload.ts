import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { processEstimationPdf } from '@/features/estimation-details/actions/estimation';
import { useEstimationStore } from '@/stores/estimation-store';

export function usePdfUpload() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  // Get store actions
  const {
    setEstimationData,
    setUploading,
    clearUploadProgress,
    setError,
    clearError
  } = useEstimationStore();

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      clearError();
      clearUploadProgress();

      const result = await processEstimationPdf(file);
      console.log('result is', result);
      if (result.success) {
        // Store only the project_id from upload response
        const projectId = String(
          result.data?.project_id || result.data?.id || ''
        );

        if (projectId) {
          // Store just the project_id, we'll fetch full data on details page
          setEstimationData({ project_id: projectId });
          toast.success('PDF uploaded successfully! Loading project data...');
          setShowCreateModal(false);
          router.push('/dashboard/estimation-details');
        } else {
          toast.error('Upload succeeded but project ID was not returned');
        }
      } else {
        toast.error(result.body || 'Failed to submit PDF');
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      toast.error('An unexpected error occurred');
    } finally {
      setUploading(false);
      clearUploadProgress();
    }
  };

  return {
    showCreateModal,
    setShowCreateModal,
    handleFileUpload
  };
}
