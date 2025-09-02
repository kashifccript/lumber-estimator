'use client';

import {
  CTASection,
  FeaturesSection,
  HeroSection,
  QuickTipsSection
} from '@/features/overview/components';
import { CreateEstimateModal } from '@/components/modal/create-estimate-modal';
import PageContainer from '@/components/layout/page-container';
import { usePdfUpload } from '@/hooks/use-pdf-upload';

export default function OverviewPage() {
  const { showCreateModal, setShowCreateModal, handleFileUpload } =
    usePdfUpload();

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
