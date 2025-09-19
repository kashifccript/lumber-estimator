import { AuthCover } from '@/components/auth/auth-cover';
import AuthHeading from '@/components/auth/auth-heading';
import SignupForm from '@/components/auth/sign-up-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignUpViewPage() {
  return (
    <div className='bg-background flex min-h-screen flex-col gap-6 p-6 sm:gap-8 md:p-0 lg:flex-row lg:gap-0'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Form */}
      <div className='flex justify-center bg-[#F8F8F8] sm:mx-8 lg:h-screen lg:w-1/2 lg:overflow-y-auto lg:px-12'>
        <div className='w-full space-y-10 lg:max-w-lg lg:space-y-20'>
          <AuthHeading
            title='Create your Account'
            subtitle='Enter all required information to discover more'
          />
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
