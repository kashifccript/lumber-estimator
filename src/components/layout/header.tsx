'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Home, LayoutGrid, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { UserNav } from './user-nav';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard/overview', icon: LayoutGrid },
    { name: 'Estimates', href: '/dashboard/estimates', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings }
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
      <div className='flex h-full items-center gap-2'>
        <Button
          variant='ghost'
          size='icon'
          className='relative h-full rounded-lg bg-white p-4'
        >
          <Bell className='h-6 w-6 text-black' />
          <span className='bg-primary absolute top-1 right-1 h-2 w-2 rounded-full'></span>
        </Button>

        <div className='flex h-full items-center gap-2 rounded-lg bg-white p-[5px]'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='https://randomuser.me/api/portraits/men/32.jpg' />
            <AvatarFallback>DB</AvatarFallback>
          </Avatar>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
