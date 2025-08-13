import { AuthCover } from '@/components/auth/auth-cover';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className='relative flex h-screen flex-col lg:flex-row'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Form */}
      <div className='flex w-full items-center justify-center bg-[#F8F8F8] p-4 lg:w-1/2 lg:p-8'>
        <div className='w-full max-w-md space-y-6'>
          {/* Form */}
          <ClerkSignInForm
            initialValues={{
              emailAddress: 'your_mail+clerk_test@example.com'
            }}
          />
        </div>
      </div>
    </div>
  );
}
