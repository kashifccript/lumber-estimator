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
import { useEstimationStore } from '@/stores/estimation-store';
import { useRouter } from 'next/navigation';

export default function OverviewPage() {
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
