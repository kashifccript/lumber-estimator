export interface LumberEstimationRequest {
  file: File;
  project_name: string;
  force_fresh?: boolean;
}

export interface LumberEstimationResponse {
  success: boolean;
  message: string;
  project_name: string;
  pdf_filename: string;
  analysis_timestamp: string;
  accuracy_metrics: {
    overall_accuracy: number;
    confidence_level: string;
    confidence_interval: [number, number];
    material_accuracy: Record<string, any>;
    total_items: number;
    matched_items: number;
    unmatched_items: number;
    validation_notes: string[];
    accuracy_guarantee: string;
    enhancement_applied: boolean;
  };
  results: {
    project_info: {
      project_name: string;
      pdf_filename: string;
      analysis_date: string;
      extraction_method: string;
    };
    building_dimensions: {
      length_feet: number;
      width_feet: number;
      height_feet: number;
      area_sqft: number;
      perimeter_feet: number;
    };
    summary: {
      total_items_found: number;
      items_by_category: Record<string, any>;
      total_quantities: Record<string, any>;
    };
    detailed_items: any[];
    lumber_estimates: {
      total_lumber_items: number;
      total_lumber_cost: number;
      lumber_by_category: Record<string, any>;
      detailed_lumber_specs: any[];
    };
    full_lumber_estimate: {
      status: string;
      message?: string;
      available_dimensions?: any;
    };
  };
}
