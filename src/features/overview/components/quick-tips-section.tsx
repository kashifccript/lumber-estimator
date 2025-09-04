import Image from 'next/image';
import { RoleContent } from '@/config/role-content';

interface QuickTipsSectionProps {
  content: RoleContent['quickTips'];
}

export function QuickTipsSection({ content }: QuickTipsSectionProps) {
  return (
    <div className='flex flex-col gap-2.5 rounded-xl bg-white p-2.5'>
      <div className='flex items-center justify-start gap-3'>
        <div className='bg-background flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm'>
          <Image
            src={'/assets/icons/quicktip.svg'}
            alt={'Quick Tip'}
            width={32}
            height={32}
          />
        </div>
        <h2 className='text-secondary text-base font-medium'>
          Quick Tips for Success
        </h2>
      </div>

      <div className='bg-background space-y-3 rounded-sm p-2.5'>
        {content.map((tip, index) => (
          <div key={index} className='flex items-start gap-3'>
            <Image
              src={'/assets/icons/boardcheck.svg'}
              alt={'Board Check'}
              width={20}
              height={20}
            />
            <p className='text-secondary text-[13px] font-light'>
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
