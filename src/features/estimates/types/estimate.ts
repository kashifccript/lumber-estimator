export interface Estimate {
  id: string;
  projectName: string;
  material: string;
  totalCost: string;
  status: {
    pending: number;
    approved: number;
    rejected: number;
    quotationNeeded: number;
  };
}
