export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  account_status: string;
  first_name: string;
  last_name: string;
  company_name?: string;
  profile_completed: number;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthError {
  detail?: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
  message?: string;
}
