import { LumberEstimationRequest, LumberEstimationResponse } from '@/types/lumber-estimation';
import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function uploadPDFForEstimation(
  request: LumberEstimationRequest,
  onProgress?: (progress: number) => void
): Promise<LumberEstimationResponse> {
  const formData = new FormData();
  formData.append('file', request.file);
  formData.append('project_name', request.project_name);
  formData.append('force_fresh', String(request.force_fresh || false));

  const token = getAuthToken();
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          
          // Single console log for API response data
          console.log('API Response Data:', response);
          
          resolve(response);
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData.detail?.[0]?.msg || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error occurred'));
    });

    xhr.addEventListener('timeout', () => {
      reject(new Error('Upload timeout'));
    });

    xhr.open('POST', `${API_BASE_URL}/lumber/estimate/pdf`);
    xhr.setRequestHeader('accept', 'application/json');
    
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    // Set timeout to 5 minutes for large files
    xhr.timeout = 300000;
    
    xhr.send(formData);
  });
}
