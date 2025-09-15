import { AuthCover } from '@/components/auth/auth-cover';
import AuthHeading from '@/components/auth/auth-heading';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function ForgotPasswordViewPage() {
  return (
    <div className='relative flex h-screen flex-col lg:flex-row'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Form */}
      <div className='flex w-full justify-center overflow-y-auto bg-[#F8F8F8] p-4 lg:w-1/2 lg:p-8  items-center flex'>
        <div className='w-full max-w-xl space-y-20'>
          <AuthHeading
            title='Forgot Password'
            // highlight='!'
            subtitle='Please enter your email address we’ll send you instructions to reset it.'
          />
          <ForgotPasswordForm/>
        </div>
      </div>
    </div>
  );
}
