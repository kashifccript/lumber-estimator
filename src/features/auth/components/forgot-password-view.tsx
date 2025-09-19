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
    <div className='bg-background flex min-h-screen flex-col gap-6 p-6 sm:gap-8 md:p-0 lg:flex-row lg:gap-0'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Form */}
      <div className='flex justify-start bg-[#F8F8F8] sm:mx-8 lg:h-screen lg:w-1/2 lg:items-center lg:overflow-y-auto lg:px-12'>
        <div className='w-full space-y-10  lg:space-y-20'>
          <AuthHeading
            title='Forgot Password'
            // highlight='!'
            subtitle='Please enter your email address we’ll send you instructions to reset it.'
          />
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
