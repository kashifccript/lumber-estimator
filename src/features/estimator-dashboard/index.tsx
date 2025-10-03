'use client'
import React from 'react';
import Header from '../admin/components/dashboard/header';
import Stats from './stats';
import { useSession } from 'next-auth/react';
import { DonutChart } from './estimate-distribution';
import CandlestickChart from './weekly-chart';
import MonthlyChart from './monthly-graph';
import Heading from '../estimates/components/heading';
import EstimatesViewPage from '../estimates/components/estimates-view-page';

const Index = () => {
  const { data: session, status } = useSession();
  const userData = session?.user.user;
  const fullName = userData?.first_name || userData?.username;
  return (
    <div className='flex flex-col gap-4 py-5'>
      <Header
        title={`Welcome in, ${fullName}`}
        subtitle='Overview of your Dashboard'
      />
      <Stats />
      <div className='flex flex-col lg:flex-row  gap-4'>
      <CandlestickChart/>
      <DonutChart/>

      </div>
      <MonthlyChart/>
   <EstimatesViewPage/>
    </div>
  );
};

export default Index;
