import { AuthCover } from '@/components/auth/auth-cover';
import AuthHeading from '@/components/auth/auth-heading';
import EmailVerification from '@/components/auth/email-verification-form';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function EmailVerificationViewPage() {
  return (
    <div className='relative flex h-screen flex-col lg:flex-row'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Form */}
      <div className='flex w-full items-center justify-center overflow-y-auto bg-[#F8F8F8] p-4 lg:w-1/2 lg:p-8'>
        <div className='w-full max-w-xl space-y-20'>
          <AuthHeading
            title='Email Verification'
            // highlight='!'
            subtitle='We’ve sent a 6-character code to your email. The code expires shortly. so enter it soon.'
          />
          <EmailVerification />
        </div>
      </div>
    </div>
  );
}
