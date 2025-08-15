import { Plus } from 'lucide-react';

interface HeroSectionProps {
  onCreateEstimate: () => void;
}

export function HeroSection({ onCreateEstimate }: HeroSectionProps) {
  return (
    <div className='flex flex-col items-stretch gap-6 lg:flex-row'>
      {/* Left Content */}
      <div className='relative flex-1 overflow-hidden rounded-lg bg-white p-8 lg:p-12'>
        {/* Background Blur Elements */}
        <div className='bg-opacity-10 absolute -top-8 -left-8 h-32 w-32 rounded-full bg-[#E2624B] blur-[37px]'></div>
        <div className='bg-opacity-10 absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-[#E2624B] blur-[37px]'></div>

        <div className='relative z-10 flex h-full min-h-[320px] flex-col justify-between'>
          <div className='space-y-6'>
            <h1 className='text-3xl font-normal lg:text-4xl xl:text-5xl'>
              <span className='text-[#1F1F1F]'>Build Better </span>
              <span className='text-[#E2624B]'>Estimates</span>
            </h1>
            <p className='max-w-lg text-lg leading-relaxed font-light tracking-[-0.36px] text-[#1F1F1F]/80'>
              Create your first estimate to unlock powerful insights and
              analytics for your projects.
            </p>
          </div>

          <button
            onClick={onCreateEstimate}
            className='inline-flex w-fit items-center gap-3 rounded-lg bg-[#E2624B] px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-[#d14d2e]'
          >
            <Plus className='h-6 w-6' />
            Create Your First Estimate
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className='min-h-[320px] flex-1 lg:min-h-[337px]'>
        <img
          src='https://api.builder.io/api/v1/image/assets/TEMP/f58a28a72d70e3bb50ed8ba8f5121ee2c93aaef6?width=1390'
          alt='Modern building architecture'
          className='h-full w-full rounded-lg object-cover'
        />
      </div>
    </div>
  );
}
