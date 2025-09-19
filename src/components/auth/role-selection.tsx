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
    title: 'Contractors',
    description:
      'Add and manage team projects, and supervise final project estimates',
    icon: 'hugeicons:labor'
  },
  {
    id: 'estimator',
    title: 'Estimators',
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
          {/* Checkmark in top-right corner */}
          {selectedRole === role.id && (
            <div className='absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500'>
              <Check className='h-4 w-4 text-white' />
            </div>
          )}

          <div className='flex flex-col items-start gap-2'>
            <div className='flex flex-row items-center justify-start gap-2 text-2xl'>
              <Icon icon={role.icon} width='24' height='24' />
              <h3 className='text-secondary font-medium'>{role.title}</h3>
            </div>
            <p className='text-base font-normal text-black'>
              {role.description}
            </p>
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
        <span className='text-lg text-gray-500'>Or</span>
        <Separator className='flex-1' />
      </div>

      {/* Login Link */}
      <p className='text-secondary text-center text-lg'>
        Already have an account?{' '}
        <Link
          href='/sign-in'
          className='text-primary font-bold hover:underline'
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
