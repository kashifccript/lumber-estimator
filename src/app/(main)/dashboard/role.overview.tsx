// src/app/(main)/dashboard/role.overview.tsx
'use client';

import {
  CTASection,
  FeaturesSection,
  HeroSection,
  QuickTipsSection
} from '@/features/overview/components';
import { CreateEstimateModal } from '@/components/modal/create-estimate-modal';
import { CreateQuotationModal } from '@/components/modal/create-quotation-modal';
import PageContainer from '@/components/layout/page-container';
import { usePdfUpload } from '@/hooks/use-pdf-upload';
import { roleContent, UserRole } from '@/config/role-content';
import { createQuotation } from '@/features/quotations/actions/actions';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';

interface RoleOverviewProps {
  role: UserRole;
}

export default function RoleOverview({ role }: RoleOverviewProps) {
  const { data: session } = useSession();
  const userId = Number(session?.user?.user?.id);
  const { showCreateModal, setShowCreateModal, handleFileUpload } =
    usePdfUpload();
  const content = roleContent[role];
    const router = useRouter();

  const handleCreateQuotation = async (data: {
    itemName: string;
    sku?: string;
    unitOfMeasure: string;
    cost: string;
  }) => {
    const res = await createQuotation(userId, {
      item_name: data.itemName,
      sku: data.sku || '',
      unit: data.unitOfMeasure,
      unit_of_measure: data.unitOfMeasure,
      cost: parseFloat(data.cost)
    });


    if (res.success) {
      // Save quotation_id to sessionStorage
      if (res.data?.quotation_id) {
        sessionStorage.setItem('quotation_id', String(res.data.quotation_id));
      }
      toast.success('Quotation created successfully!');
      router.push('/dashboard/contractor/quotation-details');
    } else {
      toast.error(res.message || 'Failed to create quotation');
    }
  };

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

        {/* Render different modals based on role */}
        {role === 'contractor' ? (
          <CreateQuotationModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            mode='create'
            onSubmit={handleCreateQuotation}
            onSuccess={() => {
              // Additional success logic
              console.log('Quotation created successfully');
            }}
            onError={(error) => {
              console.error('Error creating quotation:', error);
            }}
          />
        ) : (
          <CreateEstimateModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onFileUpload={handleFileUpload}
          />
        )}
      </div>
    </PageContainer>
  );
}
