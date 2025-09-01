export interface APIRequest {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: string | FormData;
  params?: Record<string, string>;
  tags?: string[];
  contentType?: string;
}

export interface APIResponse {
  success?: boolean;
  data?: any;
  message?: string;
  error?: string;
  [key: string]: any;
}

export interface PaginationType {
  page: number;
  limit: number;
  isPrevious: boolean;
  isNext: boolean;
  totalPages: number;
}
