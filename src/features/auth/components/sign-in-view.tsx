import { AuthCover } from '@/components/auth/auth-cover';
import AuthHeading from '@/components/auth/auth-heading';
import SigninForm from '@/components/auth/sign-in-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className='bg-background relative flex h-screen flex-col gap-6 overflow-y-auto p-6 sm:gap-8 md:p-0 lg:flex-row lg:gap-0'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Form */}
      <div className='flex items-center justify-center bg-[#F8F8F8] sm:mx-8 lg:w-1/2 lg:overflow-y-auto lg:p-8'>
        <div className='w-full space-y-10 lg:max-w-lg lg:space-y-20'>
          <AuthHeading
            title='Welcome Back'
            highlight='!'
            subtitle='Please enter your details.'
          />
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
