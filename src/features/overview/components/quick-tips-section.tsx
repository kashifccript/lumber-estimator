export function QuickTipsSection() {
  const tips = [
    'Upload high-resolution PDF plans for the most accurate results.',
    'Review the generated material list and adjust quantities if needed.',
    'Set up contractor profiles to track performance across projects'
  ];

  return (
    <div className='rounded-xl bg-white p-6'>
      <div className='mb-6 flex items-start gap-4'>
        <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15 14C15.2 13 15.7 12.3 16.5 11.5C17.5 10.6 18 9.3 18 8C18 6.4087 17.3679 4.8826 16.2426 3.7574C15.1174 2.6321 13.5913 2 12 2C10.4087 2 8.8826 2.6321 7.7574 3.7574C6.6321 4.8826 6 6.4087 6 8C6 9 6.2 10.2 7.5 11.5C8.2 12.2 8.8 13 9 14'
              stroke='#E2624B'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M9 18H15'
              stroke='#E2624B'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M10 22H14'
              stroke='#E2624B'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <h2 className='text-lg font-medium text-[#1F1F1F]'>
          Quick Tips for Success
        </h2>
      </div>

      <div className='space-y-3 rounded-lg bg-gray-100 p-4'>
        {tips.map((tip, index) => (
          <div key={index} className='flex items-start gap-3'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='mt-0.5 flex-shrink-0'
            >
              <path
                d='M12.4998 1.6665H7.49984C7.0396 1.6665 6.6665 2.0396 6.6665 2.49984V4.1665C6.6665 4.62674 7.0396 4.99984 7.49984 4.99984H12.4998C12.9601 4.99984 13.3332 4.62674 13.3332 4.1665V2.49984C13.3332 2.0396 12.9601 1.6665 12.4998 1.6665Z'
                stroke='#E2624B'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M13.3335 3.3335H15.0002C15.4422 3.3335 15.8661 3.50909 16.1787 3.82165C16.4912 4.13421 16.6668 4.55814 16.6668 5.00016V16.6668C16.6668 17.1089 16.4912 17.5328 16.1787 17.8453C15.8661 18.1579 15.4422 18.3335 15.0002 18.3335H5.00016C4.55814 18.3335 4.13421 18.1579 3.82165 17.8453C3.50909 17.5328 3.3335 17.1089 3.3335 16.6668V5.00016C3.3335 4.55814 3.50909 4.13421 3.82165 3.82165C4.13421 3.50909 4.55814 3.3335 5.00016 3.3335H6.66683'
                stroke='#E2624B'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7.5 11.6667L9.16667 13.3333L12.5 10'
                stroke='#E2624B'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <p className='text-sm font-light text-[#1F1F1F]'>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
