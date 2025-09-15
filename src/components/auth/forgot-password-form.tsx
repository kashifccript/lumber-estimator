'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
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
import { forgotPassword } from '@/features/auth/actions/forgot-password';

const formSchema = z.object({
  email: z.string().email('Invalid email address')
});

type UserFormValue = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const defaultValues = {
    email: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const result = await forgotPassword({
          email: data.email
        });
        if (result?.success) {
          toast.success(result.message);
          router.push(`/email-verification?email=${data.email}`);
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
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your email'
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' variant='default' disabled={loading}>
          {loading ? 'Submitting' : 'Continue'}
        </Button>
      </form>
    </Form>
  );
}
