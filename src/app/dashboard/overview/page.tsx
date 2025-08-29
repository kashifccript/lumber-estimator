'use client';

import { useState } from 'react';
import {
  CTASection,
  FeaturesSection,
  HeroSection,
  QuickTipsSection
} from '@/features/overview/components';
import { CreateEstimateModal } from '@/components/modal/create-estimate-modal';
import PageContainer from '@/components/layout/page-container';
import { toast } from 'sonner';
import { processEstimationPdf } from '@/features/estimation-details/actions/estimation';
import { UploadProgress } from '@/features/estimation-details/types/estimation';
import { useEstimationStore } from '@/stores/estimation-store';
import { useRouter } from 'next/navigation';

export default function OverviewPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();
  // Get store actions
  const {
    setEstimationData,
    setUploadProgress,
    setUploading,
    clearUploadProgress,
    setError,
    clearError
  } = useEstimationStore();

  const handleFileUpload = async (
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ) => {
    try {
      setUploading(true);
      clearError();
      clearUploadProgress();

      // Call the estimation API with progress callback
      const result = await processEstimationPdf(
        file,
        'Lumber Project',
        (progress: UploadProgress) => {
          setUploadProgress(progress);
          onProgress?.(progress);
        }
      );

      if (result.success) {
        setEstimationData(result.data);

        toast.success(
          `Estimation completed! Found ${result.data?.results?.summary?.total_items_found || 0} items`
        );

        setShowCreateModal(false);
        router.push('/dashboard/estimation-details');
      } else {
        toast.error(result.body || 'Failed to process PDF');
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      toast.error('An unexpected error occurred');
      setShowCreateModal(false);
    } finally {
      setUploading(false);
      clearUploadProgress();
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 pb-6'>
        <HeroSection onCreateEstimate={() => setShowCreateModal(true)} />
        <FeaturesSection />
        <QuickTipsSection />
        <CTASection onCreateEstimate={() => setShowCreateModal(true)} />

        <CreateEstimateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onFileUpload={handleFileUpload}
        />
      </div>
    </PageContainer>
  );
}
