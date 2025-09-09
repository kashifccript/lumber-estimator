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
  user_name: string;
  username?: string;

  email: string;
  role: string;
  first_name: string;
  last_name: string;
  company_name: string;
  business_license: string;
  created_at: string;
  status?: string;
  profile_picture?: string;
}
export type UserRole = 'admin' | 'estimator' | 'contractor';
export type UserStatus = 'pending' | 'active' | 'rejected';
export interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  first_name: string;
  last_name: string;
  phone: string;
  company_name: string;
  business_license: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  profile_completed: number;
  created_at: string;
  updated_at: string | null;
  last_login: string | null;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
}

export interface StatsCard {
  estimates_created_this_month: number;
  pending_requests: number;
  quotations_added_this_month: number;
  total_active_users: number;
}

export interface Estimator_Contractor {
  estimators: number | 0;
  contractors: number | 0;
  total: number | 0;
}

export interface Estimattes_QuotationStats {
  projects_created: number | 0;
  quotations_created: number | 0;
  total: number | 0;
}
