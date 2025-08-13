import { AuthCover } from '@/components/auth/auth-cover';
import AuthHeading from '@/components/auth/auth-heading';
import SigninForm from '@/components/auth/sign-in-form';
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
        <div className='w-full max-w-lg space-y-20'>
          <AuthHeading
            title='Welcome Back'
            highlight='!'
            subtitle='Please enter your details.'
          />
          <SigninForm />
          {/* Form
          <ClerkSignInForm
            initialValues={{
              emailAddress: 'your_mail+clerk_test@example.com'
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
