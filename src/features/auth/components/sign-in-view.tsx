import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { IconStar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className='relative flex h-screen flex-col lg:flex-row'>
      <div className='relative hidden lg:block lg:w-1/2'>
        <Image
          src='/assets/auth-cover.png'
          alt='logo'
          fill
          className='h-full w-full object-cover'
          priority
        />

        {/* Overlay Text */}
        <div className='absolute inset-0 flex items-end justify-center pb-16'>
          <h2 className='max-w-[80%] text-start text-[56px] leading-snug text-white'>
            Navigate World wide Property with Ease
          </h2>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className='flex w-full items-center justify-center p-4 lg:w-1/2 lg:p-8'>
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
