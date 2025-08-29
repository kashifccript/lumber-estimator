import { EstimationResult } from '../types/estimation';

export const processEstimationPdf = async (
  file: File,
  projectName: string = 'Lumber Project'
): Promise<EstimationResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_name', projectName);
    formData.append('force_fresh', 'false');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/lumber/estimate/pdf`,
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
        body: data.message || 'Estimation completed'
      };
    } else {
      return {
        success: false,
        data: data,
        body: data.message || 'Failed to process PDF'
      };
    }
  } catch (error) {
    console.error('Error processing PDF:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      body: 'Failed to process PDF'
    };
  }
};
