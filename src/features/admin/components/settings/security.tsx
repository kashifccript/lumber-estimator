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
import { useUserApis } from '../../actions/users';
import { useState } from 'react';
import { toast } from 'sonner';

const profileFormSchema = z
  .object({
    new_password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirm_password: z.string()
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match.'
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Security = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      new_password: '',
      confirm_password: ''
    }
  });
  const { resetPassword } = useUserApis();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      const response = await resetPassword(data);
      toast.success('Password updated successfully!');
      console.log('[v0] Profile updated:', response);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6 p-3'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='new_password'
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

          <FormField
            control={form.control}
            name='confirm_password'
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
              {loading ? 'Saving...' : ' Update Password'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Security;
