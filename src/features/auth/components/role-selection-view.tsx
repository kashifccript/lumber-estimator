import { AuthCover } from '@/components/auth/auth-cover';
import AuthHeading from '@/components/auth/auth-heading';
import { RoleSelection } from '@/components/auth/role-selection';

export default function RoleSelectionView() {
  return (
    <div className='bg-background relative flex h-screen flex-col gap-6 overflow-y-auto p-6 sm:gap-8 md:p-0 lg:flex-row lg:gap-0'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Role Selection */}
      <div className='flex items-center justify-center bg-[#F8F8F8] sm:mx-8 lg:w-1/2  lg:p-8'>
        <div className='w-full space-y-10 lg:max-w-lg lg:space-y-20'>
          <AuthHeading
            title='How will you be using the platform?'
            subtitle='Please select your role.'
          />
          <RoleSelection />
        </div>
      </div>
    </div>
  );
}
