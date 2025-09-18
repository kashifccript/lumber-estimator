import { CustomDropdown } from '@/components/shared/custom-dropdown';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useEstimatorApis } from '../admin/actions/estimator';
import { EstimateStatusDistribution } from '../estimates/types/estimate';

export function DonutChart() {
  const months = ['Month'];
  function getCurrentWeekRange() {
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    };
  }

  const { data: session } = useSession();
  const [stats, setStats] = useState<EstimateStatusDistribution | null>(null);
  const [loading, setLoading] = useState(true);
  const { getStatusDistribution } = useEstimatorApis();

  const { startDate, endDate } = getCurrentWeekRange();

  // Fetch API stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getStatusDistribution(startDate, endDate);
      console.log(response, 's');
      setStats(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const completePercentage = 86;
  const onHoldPercentage = 10;
  const completeCount = 140;
  const onHoldCount = 140;
  const [selectedValue, setSelectedValue] = useState(months[0]);
  return (
    <div className='flex w-full flex-col'>
      <div className='flex  flex-row gap-6 py-4 justify-between'>
        <div className='text-[20px] font-normal text-[#1F1F1F]'>
          Estimate Status Distribution
        </div>
        <CustomDropdown
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={months}
        />
      </div>

      <div className='relative mb-10 flex items-center justify-center'>
        {/* Main filled circle (86%) */}
        <div className='relative flex h-48 w-48 items-center justify-center rounded-full bg-[#E2624B] shadow-lg'>
          <span className='text-6xl font-bold text-white drop-shadow-sm'>
            {stats?.complete_percentage || 0}%
          </span>

          {/* Small overlapping circle for 10% */}
          <div className='absolute -top-2 -right-2 flex h-16 w-16 items-center justify-center rounded-full border border-[#FFFFFFA1] bg-red-200/80 shadow-md backdrop-blur-sm'>
            <span className='text-sm font-semibold text-gray-800'>
              {stats?.on_hold_percentage || 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className='w-ful flex items-center justify-between  px-3 lg:px-32'>
        <div className='text-center'>
          <div className='mb-2 text-[24px] font-normal text-[#1F1F1F]'>
            {stats?.total}
          </div>
          <div className='text-[16px] font-normal text-[#737373]'>Complete</div>
        </div>
 <div className='text-center  w-[1.5px] text-[#C0C0C0]  bg-[#C0C0C0] h-[32.06px]'/>


        <div className='text-center'>
          <div className='mb-2 text-[24px] font-normal text-[#1F1F1F]'>
            {stats?.on_hold}
          </div>
          <div className='text-[16px] font-normal text-[#737373]'>On Hold</div>
        </div>
      </div>
    </div>
  );
}
