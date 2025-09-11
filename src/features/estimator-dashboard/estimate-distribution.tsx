import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { useState } from 'react';

export function DonutChart() {
  const months = ['Month'];

  const completePercentage = 86;
  const onHoldPercentage = 10;
  const completeCount = 140;
  const onHoldCount = 140;
  const [selectedValue, setSelectedValue] = useState(months[0]);
  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-col flex-row gap-6 py-4 md:justify-between'>
        <div className='text-[20px] font-normal text-[#1F1F1F]'>
          Estimate Status Distribution
        </div>
        <CustomDropdown
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={months}
        />
      </div>

      <div className='relative mb-10 flex items-center justify-center'>
        {/* Main filled circle (86%) */}
        <div className='relative flex h-48 w-48 items-center justify-center rounded-full bg-[#E2624B] shadow-lg'>
          <span className='text-6xl font-bold text-white drop-shadow-sm'>
            {completePercentage}%
          </span>

          {/* Small overlapping circle for 10% */}
          <div className='absolute -top-2 -right-2 flex h-16 w-16 items-center justify-center rounded-full border border-[#FFFFFFA1] bg-red-200/80 shadow-md backdrop-blur-sm'>
            <span className='text-sm font-semibold text-gray-800'>
              {onHoldPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className='w-ful flex items-center justify-center gap-20'>
        <div className='text-center'>
          <div className='mb-2 text-[24px] font-normal text-[#1F1F1F]'>
            {completeCount}
          </div>
          <div className='text-[16px] font-normal text-[#737373]'>Complete</div>
        </div>

        <div className='text-center'>
          <div className='mb-2 text-[24px] font-normal text-[#1F1F1F]'>
            {onHoldCount}
          </div>
          <div className='text-[16px] font-normal text-[#737373]'>On Hold</div>
        </div>
      </div>
    </div>
  );
}
