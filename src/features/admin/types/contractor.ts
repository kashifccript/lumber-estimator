export interface Contractor {
  id?: number;
  name: string;
  total_quotations: number;
  approved_quotations: number;
  pending_quotations: number;
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
