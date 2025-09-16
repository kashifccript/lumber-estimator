'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { User } from '../../types/user';
import { useUserApis } from '../../actions/users';

const CompanyInfo = () => {
  const profileFormSchema = z.object({
    company_name: z.string().min(2, {
      message: 'Company Name must be at least 2 characters.'
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.'
    })
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      company_name: '',
      email: ''
    }
  });
  const { data: session } = useSession();

  const { me, upadteProfile } = useUserApis();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      const response = await upadteProfile(data);
      // setUser(response);
      toast.success('Company data updated successfully!');
      console.log('[v0] Profile updated:', response);
    } catch (error) {
      console.error('Error updating comapny profile:', error);
      toast.error('Error updating comapny profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await me();
      setUser(response);

      if (response) {
        form.setValue('company_name', response.company_name || '');
        form.setValue('email', response.email || '');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (user) {
      form.setValue('company_name', user.company_name || '');
      form.setValue('email', user.email || '');
    }
  }, [user, form]);

  return (
    <div className='space-y-6 p-3'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='company_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[18px] font-medium text-[#1F1F1F]'>
                  Comapny Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your company name'
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[18px] font-medium text-[#1F1F1F]'>
                  Company Email
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your company email'
                    {...field}
                    className='border-0 shadow-none placeholder:text-[#1F1F1F66]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex flex-row justify-between pt-4'>
            <div></div>
            <Button
              type='submit'
              variant='outline'
              disabled={loading}
              className='max-w-xs rounded-[10px] border-red-500 bg-transparent text-red-500 hover:bg-red-50 disabled:opacity-50'
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanyInfo;
