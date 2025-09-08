import { get } from '@/lib/api/client';

export async function getUserQuotations(userId: number) {
  try {
    const res = await get({
      endpoint: `/contractors/quotations/user/${userId}`,
      tags: [`user-quotations`]
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
        error instanceof Error
          ? error.message
          : 'Failed to fetch user quotations',
      data: null
    };
  }
}
