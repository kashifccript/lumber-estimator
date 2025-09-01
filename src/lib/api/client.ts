'use server';
import { APIRequest, APIResponse } from './types';
import { API_BASE_URL } from './constants';
import { isJsonString } from './utils';
import { auth } from 'auth';
import { revalidateTag } from 'next/cache';

const getAuthToken = async () => {
  try {
    const session = await auth();
    return session?.user?.access_token || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

const apiRequest = async ({
  endpoint,
  method,
  headers,
  body,
  params = {},
  tags,
  contentType
}: APIRequest): Promise<APIResponse> => {
  const token = await getAuthToken();

  let url = `${API_BASE_URL}${endpoint}`;

  if (Object.keys(params).length > 0) {
    const queryParams = new URLSearchParams(params);
    url = `${url}?${queryParams.toString()}`;
  }

  const options: RequestInit = {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      ...headers
    },
    body
  };

  if (
    (body && typeof body === 'string' && isJsonString(body)) ||
    (contentType && contentType !== '')
  ) {
    options.headers = {
      ...options.headers,
      'Content-Type': contentType ? contentType : 'application/json'
    };
  }

  if (tags) {
    options.next = {
      tags: tags
    };
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

const get = async (args: APIRequest): Promise<APIResponse> => {
  return await apiRequest({ ...args, method: 'GET' });
};

const post = async (args: APIRequest): Promise<APIResponse> => {
  return await apiRequest({ ...args, method: 'POST' });
};

const put = async (args: APIRequest): Promise<APIResponse> => {
  return await apiRequest({ ...args, method: 'PUT' });
};

const patch = async (args: APIRequest): Promise<APIResponse> => {
  return await apiRequest({ ...args, method: 'PATCH' });
};

const del = async (args: APIRequest): Promise<APIResponse> => {
  return await apiRequest({ ...args, method: 'DELETE' });
};

const revalidateByTag = async (tag: string) => {
  revalidateTag(tag);
  return;
};

export { get, post, put, patch, del, revalidateByTag };
