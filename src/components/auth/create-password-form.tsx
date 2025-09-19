'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransition, useState } from 'react';
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
import { resetPassword } from '@/features/auth/actions/forgot-password';
import { Eye, EyeOff } from 'lucide-react';

// ✅ Schema with runtime password match validation
const formSchema = z
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
    ),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'], // error will show on confirm_password field
    message: 'Passwords do not match'
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function CreatePasswordView() {
  const [loading, startTransition] = useTransition();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: '',
      confirm_password: ''
    }
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const result = await resetPassword({
          ...data,
          email: email
        });
        if (result?.success) {
          toast.success(result.message);
          router.push(`/sign-in`);
        } else {
          toast.error(result.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Reset password error:', error);
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5 pb-10'>
        {/* New Password */}
        <FormField
          control={form.control}
          name='new_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your New Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='your new password'
                    disabled={loading}
                    type={showNewPassword ? 'text' : 'password'}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500'
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              <FormLabel>Confirm Your Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='confirm your password'
                    disabled={loading}
                    {...field}
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
        <Button type='submit' variant='default' disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </Form>
  );
}
