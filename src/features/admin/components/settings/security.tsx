'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const profileFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.'
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Security = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  function onSubmit(data: ProfileFormValues) {
    console.log('[v0] Form submitted with data:', data);
  }

  return (
    <div className='space-y-6 p-3'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          {/* Name */}

          {/* New Password */}
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[18px] font-medium text-[#1F1F1F]'>
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter new password'
                    {...field}
                    className='border-0 shadow-none placeholder:text-[#1F1F1F66]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[18px] font-medium text-[#1F1F1F]'>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Confirm new password'
                    {...field}
                    className='border-0 shadow-none placeholder:text-[#1F1F1F66]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className='flex flex-row justify-between pt-4'>
            <div></div>
            <Button
              type='submit'
              variant='outline'
              className='max-w-xs rounded-[10px] border-red-500 bg-transparent text-red-500 hover:bg-red-50'
            >
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Security;
