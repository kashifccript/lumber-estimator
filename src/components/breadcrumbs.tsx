import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    active?: boolean;
  }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className='flex items-center gap-3'>
      <Link
        href='/dashboard'
        className='flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white transition-colors hover:bg-gray-50'
      >
        <ChevronLeft className='h-6 w-6 text-[#1F1F1F]' />
      </Link>
      <div className='text-2xl'>
        {items.map((item, index) => (
          <span key={index}>
            {item.href && !item.active ? (
              <Link
                href={item.href}
                className='text-[#1F1F1F]/45 transition-colors hover:text-[#1F1F1F]/70'
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={item.active ? 'text-[#1F1F1F]' : 'text-[#1F1F1F]/45'}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className='text-[#1F1F1F]'> / </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
