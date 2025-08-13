import Image from 'next/image';

export function AuthCover() {
  return (
    <div className='relative hidden lg:block lg:w-1/2'>
      <Image
        src='/assets/auth-cover.png'
        alt='logo'
        fill
        className='h-full w-full object-cover'
        priority
      />

      {/* Overlay Text */}
      <div className='absolute inset-0 flex items-end justify-center pb-16'>
        <h2 className='max-w-[80%] text-start text-[56px] leading-snug text-white'>
          Navigate World wide Property with Ease
        </h2>
      </div>
    </div>
  );
}
