import { get, post, revalidateByTag } from '@/lib/api/client';

export async function getUserQuotations(quotationId: number) {
  try {
    const res = await get({
      endpoint: `/contractors/quotations/${quotationId}/items`,
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



export async function createQuotation(
  userId: number,
  payload:any
) {
  try {
    const res = await post({
      endpoint: `/contractors/quotations/create`,
      params: { user_id: String(userId) },
      body: JSON.stringify(payload)
    });

    if (res.success) {
      await revalidateByTag('user-quotations');
    }

    return {
      success: res.success,
      message: res.message,
      data: res.data
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to create quotation',
      data: null
    };
  }
}
