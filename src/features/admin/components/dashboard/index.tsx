import React from 'react';
import { UserListing } from '../user-tables/user-listing';
import AdminStats from './admin-stats';
import Header from './header';
import { QuotationListing } from '../quotation-table/quotation-list';
import { DashboardCharts } from '../stat-graph/stat-graphs';

const index = () => {
  return (
    <div className='flex !min-h-screen flex-col gap-3 py-8'>
      <Header title='Welcome in, John' subtitle='Overview of your Dashboard' />
      <AdminStats />
      <DashboardCharts/>
      <UserListing />
      <QuotationListing />
    </div>
  );
};

export default index;
