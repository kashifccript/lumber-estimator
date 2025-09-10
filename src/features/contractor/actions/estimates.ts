import { get } from '@/lib/api/client';

export async function getAllEstimates(estimator_id: number) {
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
