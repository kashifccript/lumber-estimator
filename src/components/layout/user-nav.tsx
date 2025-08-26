'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { signOut, useSession } from 'next-auth/react';
// Remove Clerk imports
// import { SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Mock user data - replace with your authentication solution
const mockUser = {
  fullName: 'John Doe',
  emailAddresses: [{ emailAddress: 'john@example.com' }],
  imageUrl: ''
};

export function UserNav() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: '/sign-in'
      });
      toast.success('Signed out successfully!', { id: 'signout' });
    } catch (error) {
      toast.error('Failed to sign out. Please try again.', { id: 'signout' });
    }
  };

  // Show loading state
  if (status === 'loading') {
    return (
      <div className='flex items-center space-x-2'>
        <div className='bg-muted h-8 w-8 animate-pulse rounded-full' />
      </div>
    );
  }

  // Show sign in button if not authenticated
  if (status === 'unauthenticated' || !session?.user?.user) {
    return (
      <Button
        variant='outline'
        size='sm'
        onClick={() => router.push('/sign-in')}
      >
        Sign In
      </Button>
    );
  }

  // Extract user data from the nested structure
  const userData = session.user.user;
  const fullName =
    userData.first_name && userData.last_name
      ? `${userData.first_name} ${userData.last_name}`
      : userData.username;

  // Transform session user data to match UserAvatarProfile interface
  const user = {
    fullName: fullName,
    emailAddresses: [{ emailAddress: userData.email || '' }],
    imageUrl: '' // No image URL in your session data
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='relative px-0 py-0 hover:bg-transparent'
          >
            <UserAvatarProfile user={user} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-56'
          align='end'
          sideOffset={10}
          forceMount
        >
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm leading-none font-medium'>
                {user.fullName}
              </p>
              <p className='text-muted-foreground text-xs leading-none'>
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
              Profile
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            {/* Replace SignOutButton with custom button */}
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
