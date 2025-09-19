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
import { Eye, EyeOff } from 'lucide-react';

const profileFormSchema = z
  .object({
    new_password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),
    confirm_password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      )
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

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          {/* New Password */}
          <FormField
            control={form.control}
            name='new_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[18px] font-medium text-[#1F1F1F]'>
                  New Password
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder='Enter new password'
                      {...field}
                      className='border-0 shadow-none placeholder:text-[#1F1F1F66]'
                    />
                    <button
                      type='button'
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500'
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[18px] font-medium text-[#1F1F1F]'>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm new password'
                      {...field}
                      className='border-0 shadow-none placeholder:text-[#1F1F1F66]'
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500'
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
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
