'use client';
import { EstimateTable } from './estimate-tables';
import { columns } from './estimate-tables/columns';
import { fetchProjects } from '../actions/estimates';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function EstimateListing() {
  const [projects, setProjects] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoadingData(true);

      try {
        const response = await fetchProjects();

        if (response.success) {
          setProjects(response.projects);
        } else {
          toast.error(response.message || 'Failed to load projects');
        }
      } catch (error) {
        toast.error('Error loading projects');
      }

      setIsLoadingData(false);
    };

    loadProjects();
  }, []);

  return (
    <>
      {/* Conditional Table Rendering */}
      {isLoadingData ? (
        <DataTableSkeleton columnCount={5} rowCount={8} filterCount={0} />
      ) : (
        <EstimateTable data={projects} itemsPerPage={5} columns={columns} />
      )}
    </>
  );
}
