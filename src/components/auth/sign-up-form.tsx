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

// Zod validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(5, 'Invalid phone number'),
  company: z.string().min(2, 'Company name is required'),
  location: z.string().min(2, 'Location is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      location: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-5 pb-10'
      >
        {/* Name */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Phone */}
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Phone No</FormLabel>
              <FormControl>
                <Input placeholder='Enter your phone No' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name='company'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Company Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your company name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder='Enter Your Address' {...field} />
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
                <Input type='password' placeholder='Your Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sign Up Button */}
        <Button type='submit' variant='default'>
          Sign Up
        </Button>

        {/* Separator */}
        <div className='flex items-center gap-2'>
          <Separator className='flex-1' />
          <span className='text-sm text-gray-500'>Or</span>
          <Separator className='flex-1' />
        </div>

        {/* Social Buttons */}
        <Button type='button' variant='outline' className='flex w-full gap-2'>
          <FcGoogle size={20} /> Continue with Google
        </Button>

        <Button type='button' variant='outline' className='flex w-full gap-2'>
          <FaApple size={20} /> Continue with Apple
        </Button>

        {/* Login Link */}
        <p className='text-center text-sm'>
          Already have an account?{' '}
          <Link href='/auth/signin' className='text-primary hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
