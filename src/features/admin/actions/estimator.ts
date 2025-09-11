import { useSession } from 'next-auth/react';

export function useEstimatorApis() {
  const { data: session } = useSession();

  const fetchAllEstimators = async (query?: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/admin/estimators
?search=${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );

      if (!res.ok) throw new Error('Failed to fetch users');
      const { data } = await res.json();
      return data?.estimators || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const fetchAllEstimates = async (estimator_id?: string, query?: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/admin/estimators/${estimator_id}/projects
`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );

      if (!res.ok) throw new Error('Failed to fetch users');
      const { data } = await res.json();
      return data?.projects || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  const getStats = async () => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/estimator/dashboard`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );

      if (!res.ok) throw new Error('Failed to get stats');
      const { data } = await res.json();
      return data || null;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return [];
    }
  };
  const weeklyStats = async (start_date: string, end_date: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/estimator/weekly-accuracy?startdate=${start_date}&enddate=${end_date}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );
      if (!res.ok) throw new Error('Failed to fetch user');
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      return error;
    }
  };
  const getStatusDistribution = async (
    start_date: string,
    end_date: string
  ) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/estimator/estimate-status?startdate=${start_date}&enddate=${end_date}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );
      if (!res.ok) throw new Error('Failed to fetch user');
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      return error;
    }
  };

  const getMonthlyStats = async () => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/estimator/monthly-expenses`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );
      if (!res.ok) throw new Error('Failed to fetch user');
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      return error;
    }
  };
  return {
    fetchAllEstimators,
    fetchAllEstimates,
    getStats,
    weeklyStats,
    getStatusDistribution,
    getMonthlyStats
  };
}
