export function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20.0002 2.6665H8.00016C7.29292 2.6665 6.61464 2.94746 6.11454 3.44755C5.61445 3.94765 5.3335 4.62593 5.3335 5.33317V26.6665C5.3335 27.3737 5.61445 28.052 6.11454 28.5521C6.61464 29.0522 7.29292 29.3332 8.00016 29.3332H24.0002C24.7074 29.3332 25.3857 29.0522 25.8858 28.5521C26.3859 28.052 26.6668 27.3737 26.6668 26.6665V9.33317L20.0002 2.6665Z'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M18.6665 2.6665V7.99984C18.6665 8.70708 18.9475 9.38536 19.4476 9.88546C19.9477 10.3856 20.6259 10.6665 21.3332 10.6665H26.6665'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13.3332 12H10.6665'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.3332 17.3335H10.6665'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.3332 22.6665H10.6665'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
      title: 'Upload Your Plans',
      description: 'Simply upload your design PDF or blueprints'
    },
    {
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16 26.6668V13.3335'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M24 26.6668V5.3335'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8 26.6668V21.3335'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
      title: 'Review Estimates',
      description: 'Our AI analyzes your plans'
    },
    {
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21.3335 9.3335H29.3335V17.3335'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M29.3332 9.3335L17.9998 20.6668L11.3332 14.0002L2.6665 22.6668'
            stroke='#E2624B'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
      title: 'Track & Analyze',
      description: 'Make data-driven decisions for your constructions projects.'
    }
  ];

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      {features.map((feature, index) => (
        <div
          key={index}
          className='flex items-start gap-4 rounded-lg bg-white p-6'
        >
          <div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-[#E2624B]/10'>
            {feature.icon}
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-[#1F1F1F]'>
              {feature.title}
            </h3>
            <p className='text-sm leading-5 font-light tracking-[-0.28px] text-[#1F1F1F]'>
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
