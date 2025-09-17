import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh-52px)] py-5' hideScrollbar={true}>
          <div className='flex flex-1'>{children}</div>
        </ScrollArea>
      ) : (
        <div className='flex flex-1 py-5'>{children}</div>
      )}
    </>
  );
}
