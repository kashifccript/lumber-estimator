'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';

export default function Providers({
  activeThemeValue,
  children,
  session
}: {
  activeThemeValue: string;
  children: React.ReactNode;
  session?: any;
}) {
  return (
    <>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <ActiveThemeProvider initialTheme={activeThemeValue}>
          {children}
        </ActiveThemeProvider>
      </SessionProvider>
    </>
  );
}
