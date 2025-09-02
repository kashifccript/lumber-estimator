import { EstimateTable } from './estimate-tables';
import { columns } from './estimate-tables/columns';
import { fetchProjects } from '../actions/estimates';
import { Suspense } from 'react';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export default async function EstimateListing() {
  const response = await fetchProjects();
  const projects = response.projects || [];

  return (
    <>
      <Suspense
        fallback={
          <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
        }
      >
        <EstimateTable data={projects} itemsPerPage={5} columns={columns} />;
      </Suspense>
    </>
  );
}
