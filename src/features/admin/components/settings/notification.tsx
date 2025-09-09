'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export function NotificationPreferences() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(false);

  return (
    <div className='mx-auto w-full space-y-6 rounded-lg bg-white py-6'>
      <h2 className='mb-6 text-[24px] font-medium text-[#1F1F1F]'>
        Notification Preferences
      </h2>

      <div className='space-y-6'>
        {/* Email Notifications */}
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <h3 className='mb-1 text-[20px] font-semibold text-[#1F1F1F]'>
              Email Notifications
            </h3>
            <p className='text-[16px] leading-relaxed font-medium text-[#1F1F1F]'>
              Receive email updates about Estimates
            </p>
          </div>
          <div className='flex-shrink-0'>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              className='data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-gray-300'
            />
          </div>
        </div>

        {/* In-App Notifications */}
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <h3 className='mb-1 text-[20px] font-semibold text-[#1F1F1F]'>
              In-App Notifications
            </h3>
            <p className='text-[16px] leading-relaxed font-medium text-[#1F1F1F]'>
              See notifications within the application
            </p>
          </div>
          <div className='flex-shrink-0'>
            <Switch
              checked={inAppNotifications}
              onCheckedChange={setInAppNotifications}
              className='data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-gray-300'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
