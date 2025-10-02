import { get, del } from '@/lib/api/client';

export async function getAllProjects() {
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

export async function deleteProject(projectId: number) {
  try {
    const response = await del({
      endpoint: `/projects/${projectId}`
    });
    return {
      success: true,
      message: response.message || 'Project deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to delete project'
    };
  }
}
