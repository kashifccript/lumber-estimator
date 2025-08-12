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

export default function SignInViewPage({ stars }: { stars: number }) {
  return (
    <div className='relative flex h-screen flex-col lg:flex-row'>
      {/* Left Side - Image */}
      <div className='relative hidden lg:block lg:w-1/2'>
        <Image
          src='/assets/auth-cover.png'
          alt='logo'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className='flex w-full items-center justify-center p-4 lg:w-1/2 lg:p-8'>
        <div className='w-full max-w-md space-y-6'>
          {/* Login link */}
          <Link
            href='/examples/authentication'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'absolute top-4 right-4 hidden md:top-8 md:right-8'
            )}
          >
            Login
          </Link>

          {/* GitHub link */}
          <Link
            className='group inline-flex hover:text-yellow-200'
            target='_blank'
            href='https://github.com/kiranism/next-shadcn-dashboard-starter'
          >
            <div className='flex items-center'>
              <GitHubLogoIcon className='size-4' />
              <span className='ml-1 inline'>Star on GitHub</span>
            </div>
            <div className='ml-2 flex items-center gap-1 text-sm md:flex'>
              <IconStar
                className='size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300'
                fill='currentColor'
              />
              <span className='font-display font-medium'>{stars}</span>
            </div>
          </Link>

          {/* Form */}
          <ClerkSignInForm
            initialValues={{
              emailAddress: 'your_mail+clerk_test@example.com'
            }}
          />

          <p className='text-muted-foreground px-8 text-center text-sm'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
