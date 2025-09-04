// src/components/dashboard/role-overview.tsx
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
import { roleContent, UserRole } from '@/config/role-content';

interface RoleOverviewProps {
  role: UserRole;
}

export default function RoleOverview({ role }: RoleOverviewProps) {
  const { showCreateModal, setShowCreateModal, handleFileUpload } =
    usePdfUpload();
  const content = roleContent[role];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 pb-6'>
        <HeroSection
          onCreateEstimate={() => setShowCreateModal(true)}
          content={content.hero}
        />
        <FeaturesSection content={content.features} />
        <QuickTipsSection content={content.quickTips} />
        <CTASection
          onCreateEstimate={() => setShowCreateModal(true)}
          content={content.cta}
        />

        <CreateEstimateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onFileUpload={handleFileUpload}
          role={role}
        />
      </div>
    </PageContainer>
  );
}
