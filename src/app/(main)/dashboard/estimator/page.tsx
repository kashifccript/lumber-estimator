'use client';

import RoleOverview from '../role.overview';
import Index from '@/features/estimator-dashboard';
import { useEffect, useState } from 'react';
import { getAllProjects } from '@/features/estimates/actions/estimates';

// export const metadata = {
//   title: 'Estimator Dashboard'
// };

export default function EstimatorPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoadingData(true);

      try {
        const response = await getAllProjects();
        if (response.success) {
          setProjects(response.projects);
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadProjects();
  }, []);

  if (isLoadingData) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-center'>Loading...</div>
      </div>
    );
  }

  return projects?.length > 0 ? <Index /> : <RoleOverview role='estimator' />;
}
