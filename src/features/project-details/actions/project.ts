import { get } from '@/lib/api/client';

export async function fetchProjectById(projectId: string) {
  try {
    return await get({
      endpoint: `/projects/${projectId}`
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch project data'
    };
  }
}
