'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { loginUser } from '@/lib/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await loginUser(values);

      // Store auth data
      login(response.user, response.access_token);

      toast.success(`Welcome back, ${response.user.first_name}!`);
      router.push('/dashboard/overview');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

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
                  disabled={isLoading}
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
                    placeholder='Enter your password'
                    disabled={isLoading}
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
        <Button
          type='submit'
          variant='default'
          disabled={isLoading}
          className='w-full'
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Separator */}
        <div className='flex items-center gap-2'>
          <Separator className='flex-1' />
          <span className='text-sm text-gray-500'>Or</span>
          <Separator className='flex-1' />
        </div>

        {/* Social Login Buttons */}
        <Button type='button' variant='outline' disabled={isLoading}>
          <FcGoogle size={20} /> Continue with Google
        </Button>

        <Button type='button' variant='outline' disabled={isLoading}>
          <FaApple size={20} /> Continue with Apple
        </Button>
      </form>
    </Form>
  );
}
