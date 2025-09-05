export interface Contractor {
  id?: number;
  contractor: string;
  totalQuestions: number;
  approvedQuestions: number;
  pendingQuestions: number;
  declined: number;
}
