'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { User, Bell, Shield } from 'lucide-react';
import { Icon } from '@iconify/react';
import ProfileSettings from './profile-settings';
import Security from './security';

type TabType = 'profile' | 'security' | 'notifications';

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs = [
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: <Icon icon='lets-icons:user-light' width='24' height='24' />
    },
    {
      id: 'notifications' as TabType,
      label: 'Notifications',
      icon: <Icon icon='carbon:notification' width='32' height='32' />
    },
    {
      id: 'security' as TabType,
      label: 'Security',
      icon: <Icon icon='lets-icons:lock' width='24' height='24' />
    }
  ];

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <div className='mb-6'>
          <h2 className='text-[24px] font-semibold text-[#1F1F1F] capitalize'>
            {activeTab}
          </h2>
        </div>
        <nav className='flex gap-2'>
          {tabs.map((tab) => {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-[5px] px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'bg-[#E2624B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='mt-8'>
        {activeTab === 'profile' && (
          <div className='space-y-6'>
            <ProfileSettings />
            {/* Add your profile content here */}
          </div>
        )}

        {activeTab === 'security' && (
          <div className='space-y-6'>
            <Security />
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className='space-y-6'>
            <p className='text-muted-foreground'>Notification Preferences</p>
            {/* Add your notification content here */}
          </div>
        )}
      </div>
    </div>
  );
}
