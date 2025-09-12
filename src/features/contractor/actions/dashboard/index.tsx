'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/features/admin/components/dashboard/header';
import ContractorStats from './contractor-stats';
import CostLineChart from './contractor-estimated-cost';
import MonthlyBarChart from './contractor-monthly-estimates';
import EstimatesManagementViewPage from '@/features/estimates-management/components/estimates-management-view';

const Index = () => {
  const { data: session, status } = useSession();
  const userData = session?.user.user;
  const fullName = userData?.first_name || userData?.username;
  return (
    <div className='flex flex-col gap-6 py-8'>
      <Header
        title={`Welcome in, ${fullName}`}
        subtitle='Overview of your Dashboard'
      />
      <ContractorStats />
      <div className='flex flex-col justify-between gap-20 md:flex-row'>
        <CostLineChart />
      </div>
      <MonthlyBarChart />
      <EstimatesManagementViewPage isDashboard />
      {/* <EstimatesViewPage/> */}
    </div>
  );
};

export default Index;
