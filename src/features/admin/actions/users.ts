import { useSession } from 'next-auth/react';
import { User } from '../types/user';

export function useUserApis() {
  const { data: session } = useSession();

  const fetchUsersList = async (query?: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/users?${query}`,
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
      return data?.users || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const fetchUser = async (id?: string | number) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/users/${id}`,
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
      console.error('Error fetching user:', error);
      return [];
    }
  };
  const deleteUser = async (id?: string | number) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/users/${id}`,
        {
          method: 'DELETE',
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
      console.error('Error fetching user:', error);
      return [];
    }
  };
  const userAction = async (user_id?: string | number, approved?: boolean) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/users/${user_id}/action`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          },
          body: JSON.stringify({
            user_id,
            approved: approved,
            rejection_reason: 'none'
          })
        }
      );

      if (!res.ok) throw new Error('Failed to Update user');
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      return [];
    }
  };
  const me = async () => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/me`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );

      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      console.log(data, 'data');
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      return error;
    }
  };
  const upadteProfile = async (payload: Partial<User>) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      console.log(data, 'data');
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      return error;
    }
  };
  const resetPassword = async (payload: any) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/change-password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error('Failed to updaate the user');
      const data = await res.json();
      console.log(data, 'data');
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      return error;
    }
  };
  const getStats = async () => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/admin/dashboard/stats`,
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
  const estimatorContractor = async (start_date: string, end_date: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/admin/dashboard/signups?start_date=${start_date}&end_date=${end_date}`,
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
  const estimatesQuotation = async (start_date: string, end_date: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/admin/dashboard/activity?start_date=${start_date}&end_date=${end_date}`,
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
    fetchUsersList,
    fetchUser,
    deleteUser,
    userAction,
    me,
    upadteProfile,
    resetPassword,
    getStats,
    estimatesQuotation,
    estimatorContractor
  };
}
