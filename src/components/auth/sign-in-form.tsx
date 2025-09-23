'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransition, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { IconBrandGoogle } from '@tabler/icons-react';
import Image from 'next/image';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(50, { message: 'Username must not exceed 50 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must not exceed 100 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function SigninForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const defaultValues = {
    username: '',
    password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // Function to determine redirect URL based on user role
  const getRedirectUrl = (role: string) => {
    switch (role) {
      case 'admin':
        return '/dashboard/admin';
      case 'contractor':
        return '/dashboard/overview';
      case 'estimator':
        return '/dashboard/overview';
      default:
        return '/dashboard/overview';
    }
  };

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          username: data.username,
          password: data.password,
          redirect: false
        });
        if (result?.error) {
          toast.error(result.error || 'Invalid Credentials');
        } else if (result?.ok) {
          const session = await getSession();

          if (session?.user?.user) {
            const userRole = session.user.user.role;
            const redirectUrl = callbackUrl || getRedirectUrl(userRole);

            toast.success(
              `Welcome back! Redirecting to ${userRole} dashboard...`
            );
            router.push(redirectUrl);
          } else {
            toast.success('Signed In Successfully!');
            router.push(callbackUrl || '/dashboard/overview');
          }
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Sign in error:', error);
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-5 pb-10'
      >
        {/* Username */}
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your username'
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Your Password'
                    disabled={loading}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500'
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Forget Password link aligned right */}
        <div className='flex justify-end'>
          <Link
            href='/forgot-password'
            className='text-lg text-[#90A1B9] hover:underline'
          >
            Forgot Password
          </Link>
        </div>

        {/* Submit Button */}
        <Button type='submit' variant='default' disabled={loading}>
          {loading ? 'Signing in...' : 'LogIn'}
        </Button>

        {/* Separator */}
        <div className='flex items-center gap-2'>
          <Separator className='flex-1' />
          <span className='text-sm text-gray-500'>Or</span>
          <Separator className='flex-1' />
        </div>

        {/* Social Login Buttons */}
        <div className='flex flex-col gap-2.5'>
          <Button
            type='button'
            variant='ghost'
            className='bg-white font-medium hover:bg-white'
          >
            <Image
              src='/assets/icons/google.svg'
              alt='Google'
              width={24}
              height={24}
            />
            <span>Continue with Google</span>
          </Button>

          <Button
            type='button'
            variant='ghost'
            className='bg-white font-medium hover:bg-white'
          >
            <Image
              src='/assets/icons/apple.svg'
              alt='Google'
              width={24}
              height={24}
            />
            <span>Continue with Apple</span>
          </Button>
        </div>

        <p className='text-center text-lg font-medium'>
          Don&apos;t have an account?{' '}
          <Link
            href='/role-selection'
            className='text-primary font-bold hover:underline'
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}
