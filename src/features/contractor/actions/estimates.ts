import { get } from '@/lib/api/client';

export interface GetAllEstimatesParams {
  search?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export async function getAllEstimates(params?: GetAllEstimatesParams) {
  try {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const queryString = queryParams.toString();
    const endpoint = `/estimates/all${queryString ? `?${queryString}` : ''}`;

    const res = await get({
      endpoint
    });

    return {
      success: res.success,
      message: res.message,
      data: res.data
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch estimates'
    };
  }
}

// Legacy function for backward compatibility
export async function getAllEstimatesByEstimator(estimator_id: number) {
  try {
    const res = await get({
      endpoint: `/admin/estimators/${estimator_id}/projects`
    });
    return {
      success: res.success,
      message: res.message,
      data: res.data
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch estimates'
    };
  }
}
