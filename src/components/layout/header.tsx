'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bell,
  LayoutGrid,
  FileText,
  Settings,
  Users,
  Building2,
  Calculator,
  BarChart3,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import { ThemeSelector } from '../theme-selector';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react';

type UserRole = 'admin' | 'contractor' | 'estimator';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  isAdmin?: boolean;
}

const getRoleNavItems = (role: UserRole): NavItem[] => {
  switch (role) {
    case 'admin':
      return [
        {
          name: 'Dashboard',
          href: '/dashboard/admin',
          icon: 'mage:dashboard',
          isAdmin: true
        },

        {
          name: 'User Management',
          href: '/dashboard/admin/user-management',
          icon: 'mage:users',
          isAdmin: true
        },
        {
          name: 'Contractors',
          href: '/dashboard/admin/contractors',
          icon: 'hugeicons:labor',
          isAdmin: true
        },
        {
          name: 'Estimators',
          href: '/dashboard/admin/estimators',
          icon: 'hugeicons:estimate-01',
          isAdmin: true
        },
        {
          name: 'Settings',
          href: '/dashboard/admin/settings',
          icon: 'solar:settings-linear',
          isAdmin: true
        }
      ];
    case 'contractor':
      return [
        {
          name: 'Dashboard',
          href: '/dashboard/contractor/*',
          icon: LayoutGrid,
          isAdmin: true
        },
        {
          name: 'Quotations',
          href: '/dashboard/contractor/quotations/*',
          icon: FileText,
          isAdmin: true
        },
        {
          name: 'Estimates Management',
          href: '/dashboard/contractors/estimates-management',
          icon: Building2,
          isAdmin: true
        },
        {
          name: 'Settings',
          href: '/dashboard/contractor/settings',
          icon: Settings,
          isAdmin: true
        }
      ];
    case 'estimator':
      return [
        {
          name: 'Dashboard',
          href: '/dashboard/estimator',
          icon: LayoutGrid,
          isAdmin: true
        },
        {
          name: 'Estimates',
          href: '/dashboard/estimator/estimates',
          icon: FileText,
          isAdmin: true
        },

        {
          name: 'Settings',
          href: '/dashboard/estimator/settings',
          icon: Settings,
          isAdmin: true
        }
      ];
    default:
      return [
        {
          name: 'Dashboard',
          href: '/dashboard/estimator/overview',
          icon: LayoutGrid,
          isAdmin: true
        },
        {
          name: 'Estimates',
          href: '/dashboard/estimator/estimates',
          icon: FileText,
          isAdmin: true
        },
        {
          name: 'Settings',
          href: '/dashboard/estimator/settings',
          icon: Settings,
          isAdmin: true
        }
      ];
  }
};

const getRoleHomeUrl = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    case 'contractor':
      return '/dashboard/contractor';
    case 'estimator':
      return '/dashboard/estimator';
    default:
      return '/dashboard/estimator/overview';
  }
};

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Get role from session, fallback to estimator for development
  const role =
    (session?.user?.user?.role?.toLowerCase() as UserRole) || 'estimator';
  const navItems = getRoleNavItems(role);
  const homeUrl = getRoleHomeUrl(role);

  return (
    <header className='flex h-[52px] items-center justify-between overflow-hidden'>
      {/* Left: Logo + App Name */}
      <Link
        href={homeUrl}
        className='flex h-full items-center gap-2 rounded-lg bg-white p-[5px]'
      >
        <Image
          src='/assets/home.svg'
          alt='Lumber Estimator'
          width={26}
          height={26}
        />
        <span className='text-secondary text-base font-medium'>
          Lumber Estimator
        </span>
      </Link>

      {/* Center: Navigation */}
      <nav className='flex items-center gap-2 rounded-lg bg-white p-[5px]'>
        {navItems.map((item) => {
          // const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'outline'}
                className={`flex h-10.5 items-center gap-2 rounded-md px-5 py-[10px] text-base font-medium ${
                  isActive
                    ? 'bg-primary hover:bg-primary/90 text-white'
                    : 'bg-background text-secondary'
                }`}
              >
                {/* <Icon className='h-5 w-5' /> */}
                <Icon icon={item.icon} width='24' height='24' />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Right: Notifications + User */}
      <div className='flex h-full gap-2'>
        <Button
          variant='ghost'
          className='relative size-[50px] rounded-xl bg-white p-4'
        >
          <Bell className='text-black' />
          <span className='bg-primary absolute top-1 right-1 h-2 w-2 rounded-full' />
        </Button>

        <div className='hover:hover:bg-accent flex h-full items-center rounded-xl bg-white px-[5px] py-[10px]'>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
