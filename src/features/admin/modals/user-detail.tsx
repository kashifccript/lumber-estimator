'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';

import { useState } from 'react';
import { statusColors } from '@/lib/api/constants';
import { Modal } from '@/components/ui/modal';

interface UserDetailsProps {
  isOpen: boolean;
  onClose: (setIsPasswordModalOpen: boolean) => void;
}

type StatusType = 'pending' | 'approved' | 'rejected';

const mockUserData = {
  name: 'Dianne Russell',
  email: 'diannerussell@gmail.com',
  phone: '+1 239 3423 234',
  company: 'Dianne Constructions',
  role: 'Contractor',
  location: 'New York, NY',
  status: 'pending' as StatusType,
  avatar: '/professional-woman-contractor.png'
};

export default function UserDetails({ isOpen, onClose }: UserDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    onClose(false);
  };

  async function onSubmit() {
    setIsLoading(true);

    try {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title={'  Contractor Details'}
      description={'  Details of the new contractor'}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className='rounded-lg bg-white'>
        <div className='py-6'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-16 w-16'>
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
            </Avatar>
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
                <Badge
                  variant='secondary'
                  className={`${statusColors[mockUserData.status]} hover:${statusColors[mockUserData.status]} h-[22px] rounded-[2px] px-2 capitalize`}
                >
                  {mockUserData.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className='py-6'>
          <Button className='h-[42px] max-w-[200px] rounded-[5px]'>
            Personal Information
          </Button>
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
        <div className='flex flex-row justify-between py-6'>
          <Button
            variant='secondary'
            className='h-[48px] w-auto rounded-[8px] border-[#E2624B] text-[#E2624B]'
          >
            Close
          </Button>
          <div className='flex flex-row gap-4'>
            <Button
              variant={'destructive'}
              className='h-[48px] w-auto rounded-[8px]'
            >
              Reject
            </Button>
            <Button className='h-[48px] w-auto rounded-[5px] bg-[#00A42E] text-white hover:bg-[#00A42E]'>
              Approve
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
