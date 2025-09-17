'use client';

import { API_BASE_URL } from './api/constants';
import { getSession } from 'next-auth/react';

const getAuthToken = async () => {
  try {
    const session = await getSession();
    return session?.user?.access_token || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Downloads a file from API and triggers browser save dialog
 */
export async function downloadFile(endpoint: string, filename?: string) {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  if (!response.ok) {
    throw new Error('Download failed');
  }

  // Read response as Blob
  const blob = await response.blob();

  // Use server-provided filename if available
  let suggestedFilename = filename;
  const cd = response.headers.get('content-disposition');
  if (!suggestedFilename && cd) {
    const match = cd.match(/filename="?(.+)"?/);
    if (match?.[1]) {
      suggestedFilename = match[1];
    }
  }
  if (!suggestedFilename) {
    suggestedFilename = 'download';
  }

  // Trigger download in browser
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = suggestedFilename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
