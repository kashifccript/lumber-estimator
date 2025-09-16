import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-none border bg-white px-3 py-1 text-lg font-normal  outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-lg file:font-normal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg',
        '',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  border-0',
        className
      )}
      {...props}
    />
  );
}

export { Input };
