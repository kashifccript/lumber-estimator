export interface Estimate {
  id: string;
  projectName: string;
  material: string;
  totalCost: string;
  statuses?:any;
  status: {
    pending: number;
    approved: number;
    rejected: number;
    quotationNeeded: number;
  };
}
