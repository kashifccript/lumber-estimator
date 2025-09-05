'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CustomDropdown } from '@/components/shared/custom-dropdown';
import ContractorQuotations from './contract-quotations';
import { redirect } from 'next/navigation';

type TabType = 'profile' | 'quotations';

export function ContractorInfo() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const mockUserData = {
    name: 'Dianne Russell',
    email: 'diannerussell@gmail.com',
    phone: '+1 239 3423 234',
    company: 'Dianne Constructions',
    role: 'Contractor',
    location: 'New York, NY',
    status: 'pending',
    avatar: '/professional-woman-contractor.png'
  };

  const tabs = [
    {
      id: 'profile' as TabType,
      label: 'Personal Information',
      icon: <Icon icon='lets-icons:user-light' width='24' height='24' />
    },
    {
      id: 'quotations' as TabType,
      label: 'Quotations',
      icon: <Icon icon='carbon:notification' width='32' height='32' />
    }
  ];
  const [selectedStatus, setSelectedStatus] = useState('All');
  const dropdownList = ['all', 'pending', 'approved', 'rejected'];
  const [profileImage, setProfileImage] = useState<string>(
    '/assets/icons/profile.png'
  );
  return (
    <div className='w-full'>
      <div className='mb-8 flex flex-col gap-3'>
        <div className='flex flex-row justify-between py-4'>
          <div className='flex flex-row gap-3 text-[24px] font-semibold text-[#1F1F1F]'>
            <Icon
              icon='weui:back-filled'
              width='12'
              height='24'
              className='mt-1.5 cursor-pointer'
              onClick={() => {
                redirect('/dashboard/admin/contractors/');
              }}
            />
            <span className='!text-[#1F1F1F73]'> Contractors/</span>
            John
          </div>
          {activeTab === 'quotations' && (
            <div className='flex flex-row gap-4'>
              <div className='relative w-full max-w-sm'>
                {/* Search Icon */}
                <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#292D32]' />

                {/* Input */}
                <Input
                  type='text'
                  placeholder='Searchl'
                  className='h-[48px] rounded-[8px] border border-[#8896AB33] py-2 pr-4 pl-10 placeholder:text-[#292D32] focus-visible:ring-0 focus-visible:ring-offset-0'
                />
              </div>
              <CustomDropdown
                value={selectedStatus}
                onValueChange={setSelectedStatus}
                options={dropdownList}
              />
            </div>
          )}
        </div>

        <div className='px-4 py-6'>
          <div className='flex items-center gap-4'>
            {/* <Avatar className='h-16 w-16'>
              <AvatarImage
                src={mockUserData.avatar || '/placeholder.svg'}
                alt={mockUserData.name}
              />
              <AvatarFallback className='text-lg'>
                {mockUserData.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar> */}
            <div className='mb-8 flex items-center gap-4'>
              <div className='relative h-[90px] w-[90px] overflow-hidden rounded-full bg-gray-200'>
                <img
                  src={profileImage || '/placeholder.svg'}
                  alt='Profile Avatar'
                  className='h-full w-full object-cover'
                />
              </div>
            </div>

            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-[#1F1F1F]'>
                {mockUserData.name}
              </h3>
              <p className='mb-2 text-[12px] font-[400] text-[#1F1F1F]'>
                {mockUserData.email}
              </p>
              <div className='flex flex-row gap-3'>
                <Badge
                  variant='secondary'
                  className={`h-[22px] rounded-[2px] bg-[#00A42E33] px-2 text-[#00A42E] capitalize`}
                >
                  {mockUserData.role}
                </Badge>
              </div>
            </div>
          </div>
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
                    ? 'bg-[#E2624B] font-medium text-white'
                    : 'text-[16px] font-semibold text-[#1F1F1F] hover:bg-gray-200'
                )}
              >
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
            <div className='py-6'>
              <div className='p-2 text-[24px] font-semibold'>
                Personal Information
              </div>

              <div className='grid grid-cols-2 gap-6 p-2'>
                <div>
                  <label className='mb-1 block text-[18px] font-medium text-[#1F1F1FB2]'>
                    Name
                  </label>
                  <p className='text-[24px] font-medium text-[#1F1F1F]'>
                    {mockUserData.name}
                  </p>
                </div>

                <div>
                  <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                    Email
                  </label>
                  <p className='text-[24px] font-medium text-[#1F1F1F]'>
                    {mockUserData.email}
                  </p>
                </div>

                <div>
                  <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                    Phone Number
                  </label>
                  <p className='text-[24px] font-medium text-[#1F1F1F]'>
                    {mockUserData.phone}
                  </p>
                </div>

                <div>
                  <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                    Role
                  </label>
                  <p className='text-[24px] font-bold text-[#3DD598]'>
                    {mockUserData.role}
                  </p>
                </div>

                <div>
                  <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                    Company
                  </label>
                  <p className='text-[24px] font-medium text-[#1F1F1F]'>
                    {mockUserData.company}
                  </p>
                </div>

                <div>
                  <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                    Location
                  </label>
                  <p className='text-[24px] font-medium text-[#1F1F1F]'>
                    {mockUserData.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quotations' && (
          <div className='space-y-6'>
            <ContractorQuotations />
          </div>
        )}
      </div>
    </div>
  );
}
