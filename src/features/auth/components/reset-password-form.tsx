import { AuthCover } from '@/components/auth/auth-cover';
import AuthHeading from '@/components/auth/auth-heading';
import CreatePasswordView from '@/components/auth/create-password-form';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function CreatePasswordViewPage() {
  return (
    <div className='relative flex h-screen flex-col lg:flex-row'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Form */}
      <div className='flex w-full justify-center overflow-y-auto bg-[#F8F8F8] p-4 lg:w-1/2 lg:p-8  items-center flex'>
        <div className='w-full max-w-xl space-y-20'>
          <AuthHeading
            title='Create Password'
            // highlight='!'
            subtitle='Set your new password and remember it.'
          />
          <CreatePasswordView/>
        </div>
      </div>
    </div>
  );
}
