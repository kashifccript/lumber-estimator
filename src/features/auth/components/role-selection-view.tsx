import { AuthCover } from '@/components/auth/auth-cover';
import AuthHeading from '@/components/auth/auth-heading';
import { RoleSelection } from '@/components/auth/role-selection';

export default function RoleSelectionView() {
  return (
    <div className='relative flex h-screen flex-col lg:flex-row'>
      {/* Left Side - Cover */}
      <AuthCover />

      {/* Right Side - Role Selection */}
      <div className='flex w-full items-center justify-center overflow-y-auto bg-[#F8F8F8] p-4 lg:w-1/2 lg:p-8 items-center' >
        <div className='w-full max-w-lg space-y-20'>
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
