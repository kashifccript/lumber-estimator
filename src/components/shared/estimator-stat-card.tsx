import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust import path as needed

interface MetricsCardProps {
  title: string;
  value: number;
  textColor?: string;
  className?: string;
  subtitle?: string;
  isLoading?: boolean;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.00$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.00$/, '') + 'K';
  }
  return num.toString();
}
export function EstimatorStats({
  title,
  value,
  textColor = 'text-black',
  className,
  subtitle,
  isLoading = false
}: MetricsCardProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          'relative flex w-full max-w-sm min-w-[208px] flex-col justify-between gap-6 rounded-2xl bg-[#F8F8F8]',
          className
        )}
      >
        <div className='flex flex-col gap-4.5 overflow-hidden'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-6 w-32 bg-gray-200' />
              {subtitle && <Skeleton className='h-4 w-24 bg-gray-200' />}
            </div>
            <Skeleton className='h-10 w-10 rounded-[5px] bg-gray-200' />
          </div>
          <Skeleton className='h-14 w-24 bg-gray-200' />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex w-full !max-w-xs cursor-pointer flex-col justify-between gap-3 rounded-2xl bg-[#F8F8F8]',
        textColor,
        className
      )}
    >
      <div className='flex flex-col'>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col'>
            <div className='text-base font-normal text-[#1F1F1F] sm:text-[24px]'>
              {title}
            </div>
            {subtitle && (
              <div className='text-[12px] font-normal text-[#1F1F1F]'>
                {subtitle}
              </div>
            )}
          </div>
        </div>
        <div className='overflow-hidden text-[32px] font-normal text-[#1F1F1F] sm:text-[56px]'>
          {formatNumber(value)}
        </div>
      </div>
    </div>
  );
}
