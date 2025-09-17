import React from 'react';
interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({
  title,

  subtitle
}: HeaderProps) {
  return (
    <div className='flex flex-col'>
      <div className='text-[32px] font-semibold text-[#1F1F1F] [md:text-[40px] sm:text-[40px]'>
        {title}
      </div>
      {subtitle && (
        <div className='text-[20px] font-normal text-[#1F1F1F]'>{subtitle}</div>
      )}
    </div>
  );
}

export default Header;
