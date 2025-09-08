import { useSession } from 'next-auth/react';

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
          body: JSON.stringify({ user_id, approved: approved,rejection_reason:'none' })
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
  return { fetchUsersList, fetchUser, deleteUser, userAction };
}
