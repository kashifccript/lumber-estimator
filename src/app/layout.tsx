import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth.config';
import './globals.css';
import './theme.css';
import localFont from 'next/font/local';

const urbanist = localFont({
  src: [
    {
      path: '../../public/fonts/urbanist/Urbanist-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/urbanist/Urbanist-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/urbanist/Urbanist-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/urbanist/Urbanist-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap'
});
export const fontPoppins = localFont({
  src: '../../public/fonts/poppins/Poppins-Regular.ttf',
  variable: '--font-poppins'
});
export const fontMono = localFont({
  src: '../../public/fonts/geist-mono/GeistMono-VariableFont_wght.ttf',
  variable: '--font-mono'
});

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: 'Lumber Estimator',
  description: 'Lumber Estimator'
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');
  const session = await getServerSession(authOptions as any);

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Always force light theme
                localStorage.setItem('theme', 'light');
                document.documentElement.classList.remove('dark');
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.light}');
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          urbanist.className
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem={false}
            disableTransitionOnChange
            enableColorScheme={false}
            forcedTheme='light'
          >
            <Providers
              activeThemeValue={activeThemeValue as string}
              session={session}
            >
              <Toaster />
              {children}
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
