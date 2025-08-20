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

export default function OverviewPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    setTimeout(() => {
      setShowCreateModal(false);
      window.location.href = '/dashboard/estimation-details';
    }, 3000);
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
