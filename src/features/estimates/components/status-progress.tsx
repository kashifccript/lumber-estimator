interface StatusProgressProps {
  data: {
    pending?: number;
    approved?: number;
    rejected?: number;
    quotationNeeded?: number;
    total?: number;
  };
}

export function StatusProgress({ data }: StatusProgressProps) {
  const { pending = 0, approved = 0, rejected = 0, quotationNeeded = 0 } = data;
  const total = pending + approved + rejected + quotationNeeded || 100;

  const pendingHeight = (pending / total) * 44;
  const approvedHeight = (approved / total) * 44;
  const rejectedHeight = (rejected / total) * 44;
  const quotationHeight = (quotationNeeded / total) * 44;

  return (
    <div className='group relative flex h-11 items-end gap-4'>
      {/* Pending */}
      <div className='relative'>
        <div
          className='w-2 rounded-full bg-[#E9B33A]'
          style={{ height: `${Math.max(pendingHeight, 4)}px` }}
        />
      </div>

      {/* Approved */}
      <div className='relative'>
        <div
          className='w-2 rounded-full bg-[#00A42E]'
          style={{ height: `${Math.max(approvedHeight, 4)}px` }}
        />
      </div>

      {/* Empty/Placeholder */}
      <div className='h-11 w-2 rounded-full bg-[#E9E9E9]' />

      {/* Quotation Needed */}
      <div className='relative'>
        <div
          className='w-2 rounded-full bg-[#3B82F6]'
          style={{ height: `${Math.max(quotationHeight, 4)}px` }}
        />
      </div>

      {/* Rejected */}
      {rejected > 0 && (
        <div className='relative'>
          <div
            className='w-2 rounded-full bg-[#C81E1E]'
            style={{ height: `${Math.max(rejectedHeight, 4)}px` }}
          />
        </div>
      )}

      {/* Tooltip - only shows on hover */}
      {pending > 0 && (
        <div className='pointer-events-none absolute -top-8 left-0 z-10 rounded border bg-white px-2 py-1 text-sm opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100'>
          <span className='text-[#000]'>
            {Math.round((pending / total) * 100)}% items{' '}
          </span>
          <span className='font-bold text-[#E9B33A]'>Pending</span>
        </div>
      )}
    </div>
  );
}
