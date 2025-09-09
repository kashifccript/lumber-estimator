import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust import path as needed

interface MetricsCardProps {
  title: string;
  value: string | number;
  textColor?: string;
  className?: string;
  subtitle?: string;
  isLoading?: boolean;
}

export function StatCard({
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
          'relative flex w-full max-w-sm flex-col justify-between gap-6 rounded-2xl bg-gray-50 p-6',
          className
        )}
      >
        <div className='flex flex-col gap-2'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-2'>
              <Skeleton className="h-6 w-32 bg-gray-200" />
              {subtitle && <Skeleton className="h-4 w-24 bg-gray-200" />}
            </div>
            <Skeleton className="h-10 w-10 rounded-[5px] bg-gray-200" />
          </div>
          <Skeleton className="h-14 w-24 bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex w-full max-w-sm cursor-pointer flex-col justify-between gap-6 rounded-2xl bg-gray-50 p-6',
        textColor,
        className
      )}
    >
      <div className='flex flex-col gap-2'>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col'>
            <div className='text-[24px] font-normal text-[#1F1F1F]'>
              {title}
            </div>
            {subtitle && (
              <div className='text-[12px] font-normal text-[#1F1F1F]'>
                {subtitle}
              </div>
            )}
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-[5px] border border-[#E2624B66] bg-white'>
            <Icon
              icon='meteor-icons:arrow-up-right'
              color='#666666'
              className='h-6 w-6'
            />
          </div>
        </div>
        <div className='text-[56px] font-medium text-[#1F1F1F]'>{value}</div>
      </div>
    </div>
  );
}