'use client';

import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { dropdownList } from '@/lib/api/constants';

interface StatusDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  options?: any;
}

export function CustomDropdown({
  value,
  onValueChange,
  options = dropdownList
}: StatusDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='bg-background flex h-[48px] cursor-pointer items-center justify-between rounded-[8px] border !border-[#E2624B] px-4 py-2 text-sm text-[16px] font-medium whitespace-nowrap !text-[#E2624B] capitalize transition-colors md:w-full lg:w-fit'>
        {value}
        <ChevronDown className='ml-2 h-4 w-4 shrink-0' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='mx-4'>
        {options.map((option: any) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onValueChange(option)}
            className='cursor-pointer capitalize'
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
