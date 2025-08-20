import RoleSelectionView from '@/features/auth/components/role-selection-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Role Selection',
  description: 'Select your role to get started.'
};

export default function RoleSelectionPage() {
  return <RoleSelectionView />;
}
