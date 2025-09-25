'use client';
import Index from '@/features/contractor/actions/dashboard';
import RoleOverview from '../role.overview';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useContractorApis } from '@/features/admin/actions/contractor';
import { toast } from 'sonner';
import { Quotation } from '@/features/admin/types/contractor';
// export const metadata = {
//   title: 'Contractor Dashboard'
// };

export default function ContractorPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { fetchAllQuotationsbyUser } = useContractorApis();
  const userId = String(session?.user?.user.id);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetchAllQuotationsbyUser(userId);
      setQuotations(response);

    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuotations();
  }, [session]);

  if (loading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-center'>Loading...</div>
      </div>
    );
  }

  return quotations?.length > 0 ? (
    <Index />
  ) : (
    <RoleOverview role='contractor' />
  );
}
