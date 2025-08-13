import { Urbanist, Geist_Mono, Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const fontSans = Urbanist({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontPoppins.variable
);
