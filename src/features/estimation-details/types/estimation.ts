export type EstimationResult = {
  success: boolean;
  data?: any;
  body?: string;
  error?: string;
};

// Keep UploadProgress for the simulated progress in modal
export type UploadProgress = {
  loaded: number;
  total: number;
  percentage: number;
};

export type EstimationApiData = {
  results: {
    summary: {
      total_items_found: number;
      total_estimated_cost: number;
      project_name: string;
    };
    lumber_estimates: {
      detailed_lumber_specs: Array<{
        item_id: string;
        item_name: string;
        sku: string;
        quantity: {
          needed: number;
          unit: string;
        };
        pricing: {
          total_price: number;
        };
        sourcing: {
          available_contractors: string[];
        };
      }>;
    };
  };
};
