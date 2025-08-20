import { Estimate } from '../types/estimate';
import { EstimateTable } from './estimate-tables';
import { columns } from './estimate-tables/columns';
import { mockEstimates } from '../constants/mock-estimates';

type EstimateListingProps = {};

export default async function EstimateListing({}: EstimateListingProps) {
  // Get search params from cache (for future server-side implementation)
  // const page = searchParamsCache.get('page');
  // const projectNameSearch = searchParamsCache.get('projectName');
  // const estimateIdSearch = searchParamsCache.get('estimateId');
  // const pageLimit = searchParamsCache.get('perPage');

  // Combine search terms
  // const search = projectNameSearch || estimateIdSearch;

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search })
  // };

  // Server-side data fetching (commented for future use)
  // const data = await getEstimates(filters);
  // const totalEstimates = data.total_estimates;
  // const estimates: Estimate[] = data.estimates;

  // For now, use mock data directly
  const estimates: Estimate[] = mockEstimates;

  return <EstimateTable data={estimates} itemsPerPage={5} columns={columns} />;
}
