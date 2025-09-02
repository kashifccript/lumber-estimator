import { get } from '@/lib/api/client';

export async function fetchProjects() {
  try {
    const response = await get({
      endpoint: '/projects/all'
    });
    return {
      success: true,
      projects: response.projects,
      message: response.message || 'Projects fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch projects'
    };
  }
}
