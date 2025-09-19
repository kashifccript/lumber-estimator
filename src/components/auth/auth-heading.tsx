// components/AuthHeading.tsx
import React from 'react';

interface AuthHeadingProps {
  title: string;
  highlight?: string;
  subtitle?: string;
}

export default function AuthHeading({
  title,
  highlight,
  subtitle
}: AuthHeadingProps) {
  return (
    <div className='text-left lg:mt-13'>
      <h1 className='text-secondary text-[36px] leading-[100%] font-semibold md:text-[42px]'>
        {title}
        {highlight && <span className='text-primary'>{highlight}</span>}
      </h1>
      {subtitle && (
        <p className='mt-[10px] text-lg leading-[100%] font-normal text-[#1F1F1F]/80'>
          {subtitle}
        </p>
      )}
    </div>
  );
}
