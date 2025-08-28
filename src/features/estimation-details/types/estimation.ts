export type EstimationResult = {
  success: boolean;
  data?: any;
  body?: string;
  error?: string;
};

export type UploadProgress = {
  loaded: number;
  total: number;
  percentage: number;
};
