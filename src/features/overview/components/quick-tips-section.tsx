import Image from 'next/image';

export function QuickTipsSection() {
  const tips = [
    'Upload high-resolution PDF plans for the most accurate results.',
    'Review the generated material list and adjust quantities if needed.',
    'Set up contractor profiles to track performance across projects'
  ];

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
        {tips.map((tip, index) => (
          <div key={index} className='flex items-start gap-3'>
            <Image
              src={'/assets/icons/boardcheck.svg'}
              alt={'Board Check'}
              width={20}
              height={20}
            />
            <p className='text-secondary text-[13px] font-light'>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
