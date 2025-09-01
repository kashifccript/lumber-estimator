import { post } from '@/lib/api/client';
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

export const addManualItem = async (
  project_id: string,
  item_name: string,
  quantity: number,
  unit: string,
  sku_id?: string
) => {
  try {
    const requestData = {
      project_id,
      item_name,
      quantity,
      unit,
      sku_id: sku_id || ''
    };

    return await post({
      endpoint: '/lumber/items/manual-add',
      body: JSON.stringify(requestData)
    });
  } catch (error) {
    console.error('Error adding manual item:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add item'
    };
  }
};
