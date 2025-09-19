import Image from 'next/image';

export function AuthCover() {
  return (
    <div className='relative min-h-[345px] flex-1 md:min-h-[800px] lg:min-h-full lg:w-1/2 lg:flex-1'>
      <Image
        src='/assets/auth-cover.png'
        alt='logo'
        fill
        className='h-full w-full object-cover'
        priority
      />

      {/* Overlay Text */}
      <div className='absolute inset-0 flex items-end justify-start lg:justify-center px-6 pb-[35px] sm:px-12.5 sm:pb-[55px] md:px-15 md:pb-16'>
        <h2 className='text-start text-[28px] leading-snug text-white sm:max-w-[390px] sm:text-[42px] md:max-w-none md:text-[56px]'>
          Navigate World wide Property with Ease
        </h2>
      </div>
    </div>
  );
}
