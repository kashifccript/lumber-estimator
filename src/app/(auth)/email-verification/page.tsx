import EmailVerificationViewPage from '@/features/auth/components/email-verification-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Forgot Password',
  description: 'Forgot Password page for authentication.'
};

export default async function Page() {
  return <EmailVerificationViewPage />;
}
