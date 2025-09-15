'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useRef, useEffect } from 'react';
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

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<string>(
    '/assets/icons/profile.png'
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileFormSchema = z.object({
    username: z.string().min(2, {
      message: 'Name must be at least 2 characters.'
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.'
    })
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: ''
    }
  });
  const { data: session } = useSession();

  const { me, upadteProfile } = useUserApis();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfileImage(e.target.result as string);
        setIsUploading(false);
        console.log('[v0] Profile image uploaded:', file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      const response = await upadteProfile(data);
      // console.log(response, 'response');
      // setUser(response);
      toast.success('Profile updated successfully!');
      console.log('[v0] Profile updated:', response);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
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
        form.setValue('username', response.username || '');
        form.setValue('email', response.email || '');

        if (response.profileImage || response.avatar || response.image) {
          setProfileImage(
            response.profileImage || response.avatar || response.image
          );
        }
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
      form.setValue('username', user.username || '');
      form.setValue('email', user.email || '');

      if (user.profile_picture) {
        setProfileImage(user.profile_picture);
      }
    }
  }, [user, form]);

  return (
    <div className='space-y-6 p-3'>
      <div className='mb-8 flex items-center gap-4'>
        <div className='relative h-[90px] w-[90px] overflow-hidden rounded-full bg-gray-200'>
          <img
            src={profileImage || '/placeholder.svg'}
            alt='Profile Avatar'
            className='h-full w-full object-cover'
          />
          {isUploading && (
            <div className='bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black'>
              <div className='text-xs text-white'>Uploading...</div>
            </div>
          )}
        </div>
        <div>
          <Button
            variant={'outline'}
            onClick={triggerFileUpload}
            disabled={isUploading}
            className='cursor-pointer rounded-[10px] text-[18px] font-[400] font-medium disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isUploading ? 'Uploading...' : 'Change Avatar'}
          </Button>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
          />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[18px] font-medium text-[#1F1F1F]'>
                  Your Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your name'
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
                  Your Email
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email'
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

export default ProfileSettings;
