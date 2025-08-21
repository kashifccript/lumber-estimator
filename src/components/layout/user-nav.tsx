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
// Remove Clerk imports
// import { SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Mock user data - replace with your authentication solution
const mockUser = {
  fullName: 'John Doe',
  emailAddresses: [{ emailAddress: 'john@example.com' }],
  imageUrl: ''
};

export function UserNav() {
  // Remove Clerk user hook
  // const { user } = useUser();
  const user = mockUser; // Use mock data for now
  const router = useRouter();

  const handleSignOut = () => {
    // Implement your sign out logic here
    router.push('/auth/sign-in');
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
              <p className='text-sm font-medium leading-none'>
                {user.fullName}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
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
