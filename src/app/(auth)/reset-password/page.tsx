import CreatePasswordViewPage from '@/features/auth/components/reset-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Forgot Password',
  description: 'Forgot Password page for authentication.'
};

export default async function Page() {
  return <CreatePasswordViewPage />;
}
