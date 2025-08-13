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

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function SigninForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
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
        <Button type='submit' variant='default'>
          LogIn
        </Button>

        {/* Separator */}
        <div className='flex items-center gap-2'>
          <Separator className='flex-1' />
          <span className='text-sm text-gray-500'>Or</span>
          <Separator className='flex-1' />
        </div>

        {/* Social Login Buttons */}
        <Button type='button' variant='outline'>
          <FcGoogle size={20} /> Continue with Google
        </Button>

        <Button type='button' variant='outline'>
          <FaApple size={20} /> Continue with Apple
        </Button>
      </form>
    </Form>
  );
}
