export interface Quotation {
  id: string;
  contractor: string;
  items: number;
  cost: number;
  created_at?: string;
  status?: string;
}
