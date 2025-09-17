import KBar from '@/components/kbar';
import Header from '@/components/layout/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Lumber Estimator',
  description: 'Lumber Estimator'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <KBar>
      <div className='bg-background flex min-h-screen w-full flex-col overflow-y-auto p-6'>
        <Header />
        <main className='flex-1'>{children}</main>
      </div>
    </KBar>
  );
}
