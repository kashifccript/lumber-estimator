export interface PendingUser {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  company_name: string;
  business_license: string;
  created_at: string;
  status?: UserStatus;
}

export interface UserApprovalResponse {
  success: boolean;
  message: string;
  data?: any;
}
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  company_name: string;
  business_license: string;
  created_at: string;
  status?:string;
}
export type UserRole = 'admin' | 'estimator' | 'contractor';
export type UserStatus = 'pending' | 'active' | 'rejected';
