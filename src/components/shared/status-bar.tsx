'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Statuses = {
  available: number;
  // approved: number;
  // rejected: number;
  quotationNeeded: number;
};

const statusColors: Record<keyof Statuses, string> = {
  quotationNeeded: 'bg-[#E9B33A]',
  available: 'bg-[#00A42E]'
  // rejected: 'bg-[#3A7FF0]',
  // quotationNeeded: 'bg-[#E9E9E9]'
};

export default function StatusList({ statuses }: { statuses: Statuses }) {
  console.log("statuses", statuses);
  const maxValue = Math.max(...Object.values(statuses));

  return (
    <div className='flex h-10 items-end gap-4'>
      {Object.entries(statuses).map(([status, value]) => {
        const percentage = maxValue > 0 ? (value / maxValue) * 80 : 0;

        return (
          <Tooltip key={status}>
            <TooltipTrigger asChild>
              <div
                className={`w-2 rounded-[19px] ${statusColors[status as keyof Statuses]} cursor-pointer`}
                style={{
                  height: `${percentage}%`
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{status.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
