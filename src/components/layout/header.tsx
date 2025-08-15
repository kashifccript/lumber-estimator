'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, LayoutGrid, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { UserNav } from './user-nav';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard/overview', icon: LayoutGrid },
    { name: 'Estimates', href: '/dashboard/estimates', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings }
  ];

  return (
    <header className='flex h-[52px] items-center justify-between'>
      {/* Left: Logo + App Name */}
      <div className='flex h-full items-center gap-2 rounded-lg bg-white p-[5px]'>
        <Image
          src='/assets/home.svg'
          alt='Lumber Estimator'
          width={26}
          height={26}
        />
        <span className='text-secondary text-base font-medium'>
          Lumber Estimator
        </span>
      </div>

      {/* Center: Navigation */}
      <nav className='flex items-center gap-2 rounded-lg bg-white p-[5px]'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'outline'}
                className={`font-mediumgap-2 flex items-center rounded-md px-5 py-[10px] text-base ${
                  isActive
                    ? 'bg-primary hover:bg-primary/90 text-white'
                    : 'bg-background text-secondary'
                }`}
              >
                <Icon className='h-5 w-5' />
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
