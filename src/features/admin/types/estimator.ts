export interface Estimator {
  id?: number;
  name: string;
  totalQuestions: number;
  approved: number;
  pending: number;
  rejected: number;
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
