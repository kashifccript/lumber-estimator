'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertModal } from '@/components/modal/alert-modal';

import { useState, useEffect } from 'react';
import { statusColors } from '@/lib/api/constants';
import { Modal } from '@/components/ui/modal';
import { useUserApis } from '../actions/users';
import { UserData } from '../types/user';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

interface UserDetailsProps {
  isOpen: boolean;
  onClose: (setIsPasswordModalOpen: boolean) => void;
  id?: string | number;
}

type StatusType = 'pending' | 'approved' | 'rejected';

export default function UserDetails({ isOpen, onClose, id }: UserDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const { data: session } = useSession();
  const { userAction } = useUserApis();

  const onApprove = async () => {
    if (!session?.user?.access_token) {
      return;
    }

    try {
      setLoading(true);
      const response = await userAction(id, true);
      if (response) {
        toast.success('User Approved Successfully!');
      } else toast.error('Error approving users:');
    } catch (error) {
      toast.error('Error approving users:');
    } finally {
      setLoading(false);
      setOpenApprove(false);
    }
  };
  const onReject = async () => {
    if (!session?.user?.access_token) {
      return;
    }

    try {
      setLoading(true);
      const response = await userAction(id, false);
      if (response) {
        toast.success('User Rejected Successfully!');
      }
    } catch (error) {
      toast.error('Error rejecting users:');
    } finally {
      setLoading(false);
      setOpenReject(false);
    }
  };
  const [profileImage, setProfileImage] = useState<string>(
    '/assets/icons/profile.png'
  );

  const { fetchUser } = useUserApis();

  useEffect(() => {
    if (isOpen && id) {
      fetchUsers();
    }
  }, [isOpen, id]);

  const handleClose = () => {
    onClose(false);
  };

  const fetchUsers = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const response = await fetchUser(id);
      if (response) {
        setUserData(response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFullName = () => {
    if (!userData) return '';
    return `${userData.first_name} ${userData.last_name}`.trim();
  };

  const getFullAddress = () => {
    if (!userData) return '';
    return `${userData.city}, ${userData.state}`.trim();
  };

  if (isLoading) {
    return (
      <Modal
        title='Contractor Details'
        description='Loading contractor details...'
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className='flex items-center justify-center py-8'>
          <div className='text-center'>Loading...</div>
        </div>
      </Modal>
    );
  }

  if (!userData) {
    return (
      <Modal
        title='Contractor Details'
        description='Contractor details not found'
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className='flex items-center justify-center py-8'>
          <div className='text-center'>No user data available</div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        title={` ${userData.role.charAt(0).toUpperCase() + userData.role.slice(1).toLowerCase()} Details`}
        description={`Details of the new ${userData.role.charAt(0).toUpperCase() + userData.role.slice(1).toLowerCase()}`}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className='rounded-lg bg-white'>
          <div className='py-6'>
            <div className='flex flex-row items-center justify-center gap-4'>
              <div className='relative h-[90px] w-[90px] overflow-hidden rounded-full bg-gray-200'>
                <img
                  src={profileImage || '/placeholder.svg'}
                  alt='Profile Avatar'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-[#1F1F1F]'>
                  {getFullName()}
                </h3>
                <p className='mb-2 text-[12px] font-[400] text-[#1F1F1F]'>
                  {userData.email}
                </p>
                <div className='flex flex-row gap-3'>
                  <Badge
                    variant='secondary'
                    className={`h-[22px] rounded-[2px] ${userData.role == 'Contractor' ? 'bg-[#3DD598]' : 'bg-[#3B81F5]'} px-2 text-white capitalize`}
                  >
                    {userData.role}
                  </Badge>
                  <Badge
                    variant='secondary'
                    className={`${statusColors[userData?.status?.toLowerCase() as StatusType]} hover:${statusColors[userData?.status?.toLowerCase() as StatusType]} h-[22px] rounded-[2px] px-2 capitalize`}
                  >
                    {userData.status}
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
                  {getFullName()}
                </p>
              </div>

              <div>
                <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                  Email
                </label>
                <p className='text-[24px] font-medium text-[#1F1F1F]'>
                  {userData.email}
                </p>
              </div>

              <div>
                <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                  Phone Number
                </label>
                <p className='text-[24px] font-medium text-[#1F1F1F]'>
                  {userData.phone}
                </p>
              </div>

              <div>
                <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                  Role
                </label>
                <p className='text-[24px] font-bold text-[#3DD598]'>
                  {userData.role}
                </p>
              </div>

              <div>
                <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                  Company
                </label>
                <p className='text-[24px] font-medium text-[#1F1F1F]'>
                  {userData.company_name}
                </p>
              </div>

              <div>
                <label className='mb-1 block text-[18px] font-medium !text-[#1F1F1FB2]'>
                  Location
                </label>
                <p className='text-[24px] font-medium text-[#1F1F1F]'>
                  {getFullAddress()}
                </p>
              </div>
            </div>
          </div>
          {userData.status === 'pending' ||
            (userData.status === 'Pending' && (
              <div className=' py-6 flex flex-col gap-6 sm:flex-row sm:justify-between'>
                <Button
                  variant='secondary'
                  className='h-[48px] w-auto rounded-[8px] border-[#E2624B] text-[#E2624B]'
                  onClick={handleClose}
                >
                  Close
                </Button>

                <div className='py-6 flex flex-col gap-4 sm:flex-row'>
                  <Button
                    variant={'destructive'}
                    className='h-[48px] w-auto rounded-[8px]'
                    onClick={() => setOpenReject(true)}
                  >
                    Reject
                  </Button>
                  <Button
                    className='h-[48px] w-auto rounded-[5px] bg-[#00A42E] text-white hover:bg-[#00A42E]'
                    onClick={() => setOpenApprove(true)}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </Modal>
      <AlertModal
        isOpen={openApprove}
        onClose={() => setOpenApprove(false)}
        onConfirm={onApprove}
        loading={loading}
        title='Approve User'
        description={`Are you sure you want to Approve ${userData.first_name} ?`}
      />
      <AlertModal
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
        onConfirm={onReject}
        loading={loading}
        title='Reject User'
        description={`Are you sure you want to Reject ${userData.first_name} ?`}
      />
    </>
  );
}
