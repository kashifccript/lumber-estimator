export interface Estimate {
  id: string;
  projectName: string;
  material: string;
  totalCost: string;
  statuses?: {
    available: number;
    quotationNeeded: number;
  };
  status: {
    pending: number;
    approved: number;
    rejected: number;
    quotationNeeded: number;
  };
}

export interface EstimatorStat {
  total_projects: number | 0;
  active_estimates: number | 0;
  expenses_this_month: number | 0;
  no_of_contractors: number | 0;
  percentage: number | 0;
}
export interface EstimateStatusDistribution {
  on_hold: number | 0;
  complete_percentage: number | 0;
  on_hold_percentage: number | 0;
  total: number | 0;
}
