import { Plus } from 'lucide-react';

interface CTASectionProps {
  onCreateEstimate: () => void;
}

export function CTASection({ onCreateEstimate }: CTASectionProps) {
  return (
    <div className='rounded-xl bg-white p-6'>
      <div className='rounded-lg bg-gray-100 p-8 text-center lg:p-12'>
        <div className='space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-3xl font-medium text-[#1F1F1F] lg:text-4xl'>
              Ready to Get Started
            </h2>
            <p className='mx-auto max-w-md text-lg font-light text-[#1F1F1F]'>
              Join thousands of construction professionals who are saving time
              and improving accuracy with EstimatorPro.
            </p>
          </div>

          <button
            onClick={onCreateEstimate}
            className='inline-flex items-center gap-3 rounded-lg bg-[#E2624B] px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-[#d14d2e]'
          >
            <Plus className='h-6 w-6' />
            Create Your First Estimate
          </button>
        </div>
      </div>
    </div>
  );
}
