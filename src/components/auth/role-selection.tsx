'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { Icon } from '@iconify/react';

type Role = 'admin' | 'contractor' | 'estimator';

interface RoleOption {
  id: Role;
  title: string;
  description: string;
  icon: string;
}

const roleOptions: RoleOption[] = [
  // {
  //   id: 'admin',
  //   title: 'Admin',
  //   description:
  //     'Manage users, oversee system settings, and ensure data integrity',
  //   icon: '👨‍💼'
  // },
  {
    id: 'contractor',
    title: 'Contractor',
    description:
      'Add and manage team projects, and supervise final project estimates',
    icon: 'hugeicons:labor'
  },
  {
    id: 'estimator',
    title: 'Estimator',
    description:
      'Upload project files to automatically generate detailed cost estimates',
    icon: 'hugeicons:estimate-01'
  }
];

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole) {
      // Navigate to signup with role as URL parameter
      router.push(`/sign-up?role=${selectedRole}`);
    }
  };

  return (
    <div className='space-y-8'>
      {roleOptions.map((role) => (
        <Card
          key={role.id}
          className={`relative cursor-pointer rounded-[8px] p-5 transition-all hover:bg-[#FFFFFF] hover:shadow-xs ${
            selectedRole === role.id ? 'bg-white' : 'border-0'
          }`}
          onClick={() => setSelectedRole(role.id)}
        >
          <div className='flex items-start space-x-3'>
            <div className='mt-2 text-2xl'>
              <Icon icon={role.icon} width='24' height='24' />
            </div>
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <h3 className='font-medium text-gray-900'>{role.title}</h3>
                {selectedRole === role.id && (
                  <div className='flex h-5 w-5 items-center justify-center rounded-full bg-orange-500'>
                    <Check className='h-3 w-3 text-white' />
                  </div>
                )}
              </div>
              <p className='mt-1 text-sm text-gray-600'>{role.description}</p>
            </div>
          </div>
        </Card>
      ))}

      <Button
        onClick={handleContinue}
        disabled={!selectedRole}
        type='submit'
        variant='default'
        className='h-[52px] w-full'
      >
        Continue
      </Button>

      {/* Separator */}
      <div className='flex items-center gap-2'>
        <Separator className='flex-1' />
        <span className='text-sm text-gray-500'>Or</span>
        <Separator className='flex-1' />
      </div>

      {/* Login Link */}
      <p className='text-center text-sm'>
        Already have an account?{' '}
        <Link href='/sign-in' className='text-primary hover:underline'>
          Sign In
        </Link>
      </p>
    </div>
  );
}
