'use client'
import React from 'react';
import { UserListing } from '../user-tables/user-listing';
import AdminStats from './admin-stats';
import Header from './header';
import { QuotationListing } from '../quotation-table/quotation-list';
import { DashboardCharts } from '../stat-graph/stat-graphs';
import { QuotationListingDashboard } from './quotation/quotation-list';
import { useSession } from 'next-auth/react';

const Index = () => {
  const { data: session, status } = useSession();
  const userData = session?.user.user;
  const fullName = userData?.first_name || userData?.username;

  return (
    <div className='flex !min-h-screen flex-col gap-3 py-8'>
      <Header
        title={`Welcome in, ${fullName}`}
        subtitle='Overview of your Dashboard'
      />
      <AdminStats />
      <DashboardCharts />
      <UserListing />
      <QuotationListingDashboard />
      {/* <QuotationListing /> */}
    </div>
  );
};

export default Index;
