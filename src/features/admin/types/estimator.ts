export interface Estimator {
  id?: number;
  name: string;
  totalQuestions: number;
  approved: number;
  pending: number;
  rejected: number;
}
