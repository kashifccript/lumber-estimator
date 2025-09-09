import { useSession } from 'next-auth/react';

export function useContractorApis() {
  const { data: session } = useSession();

  const fetchAllContractors = async (query?: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/admin/contractors
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
      return data?.contractors || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  const fetchAllQuotationsbyUser = async (user_id?: string, query?: string) => {
    if (!session?.user?.access_token) return [];
    let queryString = ``;
    if (query)
      queryString = `${process.env.NEXT_PUBLIC_SERVER_HOST}/contractors/quotations/user/${user_id}?status=${query}`;
    else
      queryString = `${process.env.NEXT_PUBLIC_SERVER_HOST}/contractors/quotations/user/${user_id}`;
    try {
      const res = await fetch(queryString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user.access_token}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch Quotations');
      const { data } = await res.json();
      return data?.quotations || [];
    } catch (error) {
      console.error('Error fetching Quotations:', error);
      return [];
    }
  };
  const fetchAllItemsWithinQuotation = async (quotation_id?: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/contractors/quotations/${quotation_id}/items`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );

      if (!res.ok) throw new Error('Failed to fetch Quotations');
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching Quotations:', error);
      return [];
    }
  };
  const updateQuotationStatus = async (
    quotation_id?: string,
    approved?: boolean
  ) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/admin/quotations/${quotation_id}/action`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          },
          body: JSON.stringify({
            user_id: quotation_id,
            approved: approved,
            rejection_reason: 'none'
          })
        }
      );

      if (!res.ok) throw new Error('Failed to update Quotation');
      const { data } = await res.json();
      return data?.items || [];
    } catch (error) {
      console.error('Error updating Quotation', error);
      return [];
    }
  };
  const delteQuotation = async (quotation_id?: string) => {
    if (!session?.user?.access_token) return [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/contractors/quotations/${quotation_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.access_token}`
          }
        }
      );

      if (!res.ok) throw new Error('Failed to delete Quotation');
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error delete Quotation', error);
      return error;
    }
  };
  const fetchAllQuotations = async (search?: string, status?: string) => {
    if (!session?.user?.access_token) return [];

    try {
      // Build query params dynamically
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status) params.append('status', status);

      const url = `${process.env.NEXT_PUBLIC_SERVER_HOST}/admin/quotations${
        params.toString() ? `?${params.toString()}` : ''
      }`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user.access_token}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch Quotations');

      const { data } = await res.json();
      return data?.quotations || [];
    } catch (error) {
      console.error('Error fetching Quotations:', error);
      return [];
    }
  };

  return {
    fetchAllContractors,
    fetchAllQuotationsbyUser,
    fetchAllItemsWithinQuotation,
    updateQuotationStatus,
    delteQuotation,
    fetchAllQuotations
  };
}
