'use client';

import { Button } from '@/components/ui/button';
import { LayoutGrid, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { UserNav } from './user-nav';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react';
import { MobileNav } from './mobile-nav';

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
          href: '/dashboard/contractor',
          icon: 'mage:dashboard'
        },
        {
          name: 'Quotations',
          href: '/dashboard/contractor/quotations',
          icon: 'solar:database-linear'
        },
        {
          name: 'Estimates Management',
          href: '/dashboard/contractor/estimates-management',
          icon: 'hugeicons:estimate-01'
        },
        {
          name: 'Settings',
          href: '/dashboard/contractor/settings',
          icon: 'solar:settings-linear'
        }
      ];
    case 'estimator':
      return [
        {
          name: 'Dashboard',
          href: '/dashboard/estimator',
          icon: 'mage:dashboard'
        },
        {
          name: 'Estimates',
          href: '/dashboard/estimator/estimates',
          icon: 'hugeicons:estimate-01'
        },
        {
          name: 'Settings',
          href: '/dashboard/estimator/settings',
          icon: 'solar:settings-linear'
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
      {/* Mobile Layout */}
      <div className='flex w-full items-center justify-between lg:hidden'>
        <MobileNav />

        <Link
          href={homeUrl}
          className='flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-white'
        >
          <Image
            src='/assets/home.svg'
            alt='Lumber Estimator'
            width={24}
            height={24}
          />
        </Link>

        <div className='flex h-[42px] items-center rounded-xl bg-white px-[5px] py-[10px]'>
          <UserNav />
        </div>
      </div>

      <div className='hidden h-[52px] w-full items-center justify-between lg:flex'>
        {/* Left: Logo + App Name */}
        <Link
          href={homeUrl}
          className='flex h-full items-center gap-2 rounded-lg bg-white p-[5px] pr-2.5'
        >
          <Image
            src='/assets/home.svg'
            alt='Lumber Estimator'
            width={40}
            height={40}
            className='bg-background rounded-md p-1.5'
          />
          <span className='text-secondary text-base font-medium'>
            Lumber Estimator
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className='flex items-center gap-2 rounded-lg bg-white p-[5px]'>
          {navItems.map((item) => {
            let isActive =
              item.href === '/dashboard/admin' ||
              item.href === '/dashboard/estimator' ||
              item.href === '/dashboard/contractor'
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(item.href + '/');

            // Keep Estimates highlighted on related detail pages
            if (item.href === '/dashboard/estimator/estimates') {
              if (
                pathname.startsWith('/dashboard/estimator/project-details') ||
                pathname.startsWith('/dashboard/estimator/estimation-details')
              ) {
                isActive = true;
              }
            }

            // Keep Quotations highlighted on contractor quotation details pages
            if (item.href === '/dashboard/contractor/quotations') {
              if (
                pathname.startsWith('/dashboard/contractor/quotation-details')
              ) {
                isActive = true;
              }
            }
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
                  <Icon icon={item.icon} width='24' height='24' />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right: Notifications + User */}
        <div className='flex h-full gap-2'>
          <div className='hover:bg-accent flex h-full items-center rounded-xl bg-white px-[5px] py-[10px]'>
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
