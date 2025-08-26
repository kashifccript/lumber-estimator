'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransition } from 'react';
import { signIn } from 'next-auth/react';
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
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

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
  const router = useRouter();

  const defaultValues = {
    username: '',
    password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          username: data.username,
          password: data.password,
          callbackUrl: callbackUrl ?? '/dashboard',
          redirect: false
        });

        if (result?.error) {
          toast.error('Invalid Credentials!');
          router.push('/');
        } else {
          toast.success('Signed In Successfully!');
          router.push(result?.url || '/dashboard');
        }
      } catch (error) {
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
                    type='password'
                    placeholder='Your Password'
                    disabled={loading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Forget Password link aligned right */}
        <div className='flex justify-end'>
          <Link
            href='/auth/forgot-password'
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
        {/* <div className='flex items-center gap-2'>
          <Separator className='flex-1' />
          <span className='text-sm text-gray-500'>Or</span>
          <Separator className='flex-1' />
        </div> */}

        {/* Social Login Buttons - Commented out for now */}
        {/*
        <Button type='button' variant='outline' disabled={isLoading}>
          <FcGoogle size={20} /> Continue with Google
        </Button>

        <Button type='button' variant='outline' disabled={isLoading}>
          <FaApple size={20} /> Continue with Apple
        </Button>
        */}
      </form>
    </Form>
  );
}
