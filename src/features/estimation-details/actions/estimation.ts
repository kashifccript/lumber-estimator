import { post } from '@/lib/api/client';
import { EstimationResult } from '../types/estimation';
import { getSession } from 'next-auth/react';

export const processEstimationPdf = async (
  file: File
): Promise<EstimationResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('force_fresh', 'true');

    const response = await post({
      endpoint: '/lumber/estimate/pdf',
      body: formData
    });

    if (response.success) {
      return {
        success: true,
        data: response,
        body: response.message || 'Estimation submitted'
      };
    } else {
      return {
        success: false,
        data: response.data,
        body: response.message || 'Failed to submit PDF'
      };
    }
  } catch (error) {
    console.error('Error processing PDF:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      body: 'Failed to submit PDF'
    };
  }
};

export const fetchProjectData = async (projectId: string) => {
  try {
    const session = await getSession();
    const token = session?.user?.access_token;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/projects/${projectId}`,
      {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          Accept: 'application/json'
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || 'Failed to fetch project data'
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch project data'
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
