import { EstimationResult, UploadProgress } from '../types/estimation';

export const processEstimationPdf = async (
  file: File,
  projectName: string = 'Lumber Project',
  onProgress?: (progress: UploadProgress) => void
): Promise<EstimationResult> => {
  return new Promise<EstimationResult>((resolve) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('project_name', projectName);
      formData.append('force_fresh', 'false');

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentage = (event.loaded / event.total) * 100;
          onProgress({
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round(percentage)
          });
        }
      });

      // Handle successful response
      xhr.addEventListener('load', () => {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            success: xhr.status >= 200 && xhr.status < 300,
            data: response,
            body: response.message || 'Estimation completed'
          });
        } catch (error) {
          resolve({
            success: false,
            error: 'Failed to parse response',
            body: 'Failed to process PDF'
          });
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        resolve({
          success: false,
          error: 'Network error',
          body: 'Failed to process PDF'
        });
      });

      // Send the request
      xhr.open(
        'POST',
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/lumber/estimate/pdf`
      );
      xhr.send(formData);
    } catch (error) {
      resolve({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        body: 'Failed to process PDF'
      });
    }
  });
};
