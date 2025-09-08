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
