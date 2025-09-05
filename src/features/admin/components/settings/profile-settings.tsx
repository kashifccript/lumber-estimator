'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<string>(
    '/assets/icons/profile.png'
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileFormSchema = z.object({
    name: z.string().min(2, {
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
      name: '',
      email: ''
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    // Create preview URL
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

  function onSubmit(data: ProfileFormValues) {
    console.log('[v0] Form submitted with data:', data);
    console.log('[v0] Profile image:', profileImage);
    // Handle form submission here - you can include the profileImage in your submission
  }

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
          {/* <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p> */}
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='name'
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
              className='max-w-xs rounded-[10px] border-red-500 bg-transparent text-red-500 hover:bg-red-50'
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSettings;
