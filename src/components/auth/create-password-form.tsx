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

const formSchema = z.object({
  confirm_password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must not exceed 100 characters' }),
  new_password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must not exceed 100 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function CreatePasswordView() {
  const [loading, startTransition] = useTransition();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const router = useRouter();

  const defaultValues = {
    new_password: '',
    confirm_password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
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
          toast.error(
            result.message || 'Something went wrong. Please try again.'
          );
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
              <FormLabel>Your Confirm Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='your confirm password'
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
          {loading ? 'Reseting' : 'Reset Password'}
        </Button>
      </form>
    </Form>
  );
}
