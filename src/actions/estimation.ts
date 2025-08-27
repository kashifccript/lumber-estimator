export const processEstimationPdf = async (
  file: File,
  projectName: string = 'Lumber Project'
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_name', projectName);
    formData.append('force_fresh', 'false');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/lumber/estimate/pdf`,
      {
        method: 'POST',
        body: formData
      }
    );

    const response = await res.json();

    return {
      success: res.ok,
      data: response,
      body: response.message || 'Estimation completed'
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      body: 'Failed to process PDF'
    };
  }
};
