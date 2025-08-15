import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CTASectionProps {
  onCreateEstimate: () => void;
}

export function CTASection({ onCreateEstimate }: CTASectionProps) {
  return (
    <div className='rounded-xl bg-white p-2.5'>
      <div className='bg-background flex flex-col items-center justify-center gap-7.5 rounded-lg p-8 text-center lg:p-12'>
        <div className='flex flex-col gap-2.5'>
          <h2 className='text-secondary text-base font-medium md:text-2xl lg:text-4xl'>
            Ready to Get Started
          </h2>
          <p className='text-secondary mx-auto max-w-md text-sm font-light md:text-base'>
            Join thousands of construction professionals who are saving time and
            improving accuracy with EstimatorPro.
          </p>
        </div>
        <Button
          onClick={onCreateEstimate}
          className='w-fit items-center gap-3 rounded-lg px-5 py-3 font-medium text-white shadow-lg transition-colors hover:bg-[#d14d2e]'
        >
          <Plus className='size-6' />
          Create Your First Estimate
        </Button>
      </div>
    </div>
  );
}
