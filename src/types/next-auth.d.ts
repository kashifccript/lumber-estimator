import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    sub: string;
    access_token: string;
    token_type: string;
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
      account_status: string;
      first_name: string | null;
      last_name: string | null;
      company_name: string | null;
      profile_completed: number;
    };
    id: string;
    iat: number;
    exp: number;
    jti: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
