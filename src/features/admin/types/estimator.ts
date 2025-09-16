export interface Estimator {
  id?: number;
  name: string;
  total_projects: number;
  pending_projects?: number;
  rejected_projects?: number;
  active_projects: number;
  total_project_value?: number;
  account_status?: string;
  profile_picture?:string;
  avatar?:string
}

export interface Estimates {
  project_id?: number;
  project_name: string;
  item_count: number;
  total_cost?: number;
  quotation_needed_items?: number;
  available_items: number;
  // total_project_value?: number;
  // account_status?: string;
  status?:string;
}


export interface Item {
  item_name:string;
  sku:string;
  quantity_needed:number;
  status:string


}
export interface EstimatorDetailsTable {
  id?: number;
  project_name: string;
  items: number;
  cost: number;
  statuses: {
    pending: number;
    approved: number;
    rejected: number;
    quotationNeeded: number;
  };
}
