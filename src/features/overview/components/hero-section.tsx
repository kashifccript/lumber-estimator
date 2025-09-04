import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { RoleContent } from '@/config/role-content';

interface HeroSectionProps {
  onCreateEstimate: () => void;
  content: RoleContent['hero'];
}

export function HeroSection({ onCreateEstimate, content }: HeroSectionProps) {
  return (
    <div className='flex flex-col items-stretch gap-3 lg:flex-row'>
      {/* Left Content */}
      <div className='relative flex-1 overflow-hidden rounded-lg bg-white p-8 lg:p-7.5'>
        {/* Background Blur Elements */}
        <div className='bg-opacity-10 bg-primary absolute -top-8 -left-8 size-[116px] rounded-full blur-[74px]'></div>
        <div className='bg-opacity-10 bg-primary absolute -right-8 -bottom-8 size-[116px] rounded-full blur-[74px]'></div>

        <div className='relative z-10 flex h-full min-h-[320px] flex-col justify-between'>
          <div className='space-y-[10px]'>
            <h1 className='text-3xl leading-[100%] font-normal lg:text-[40px]'>
              <span className='text-secondary'>{content.title.split(' ')[0]} </span>
              <span className='text-primary'>{content.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className='text-secondary/80 text-lg leading-[100%] font-light'>
              {content.subtitle}
            </p>
          </div>

          <Button
            onClick={onCreateEstimate}
            className='w-fit items-center gap-3 rounded-lg px-5 py-3 font-medium text-white shadow-lg transition-colors hover:bg-[#d14d2e]'
          >
            <Plus className='size-6' />
            {content.buttonText}
          </Button>
        </div>
      </div>

      {/* Right Image */}
      <div className='flex-1'>
        <div className='h-full min-h-[320px] lg:min-h-[337px]'>
          <Image
            src={'/assets/hero1.png'}
            alt='Modern building architecture'
            className='h-full w-full rounded-lg object-cover'
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  );
}
