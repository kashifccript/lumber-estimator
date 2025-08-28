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

export default function OverviewPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleFileUpload = async (
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ) => {
    try {
      // Call the estimation API with progress callback
      const result = await processEstimationPdf(
        file,
        'Lumber Project',
        onProgress
      );

      // Console log the full response in JSON format
      console.log('API Response:', JSON.stringify(result.data, null, 2));

      if (result.success) {
        // Store the API response in localStorage to pass to estimation details page
        localStorage.setItem('estimationApiData', JSON.stringify(result.data));

        // Show success toast
        toast.success(
          `Estimation completed! Found ${result.data?.results?.summary?.total_items_found || 0} items`
        );

        // Close modal and redirect
        setShowCreateModal(false);
        window.location.href = '/dashboard/estimation-details';
      } else {
        toast.error(result.body || 'Failed to process PDF');
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast.error('An unexpected error occurred');
      setShowCreateModal(false);
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
