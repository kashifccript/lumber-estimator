export interface Contractor {
  id?: number;
  name: string;
  total_quotations: number;
  approved_quotations: number;
  pending_quotations: number;
  profile_picture?: string;
  avatar?: string;
  declined_quotations: number;
}
export interface Quotation {
  quotation_id: string;
  quotation_name: string;
  client_name: number;
  total_cost: number;
  created_at?: string;
  item_count: number;
  skus?: string[];
  status?: string;
}
export interface Item {
  item_id: string;
  item_name: string;
  sku_id: string;
  unit: string;
  unit_of_measure?: string;
  cost: number;
  quantity?: number;
  total_cost?: number;
}

export interface QuotationDashboard {
  quotation_id: string;
  quotation_name: string;
  client_name: number;
  total_cost: number;
  created_at?: string;
  item_count: number;
  skus?: string[];
  status?: string;
  contractor: {
    name: string;
    first_name: string;
    id: string;
    last_name: string;
  };
}

export interface ContractorDashboardStats {
  approved_projects: number | 0;
  pending_approvals: number | 0;
  active_project_value: number | 0;
  quotation_items: number | 0;
  approval_percentage: number | 0;
  total: number | 0;
}
