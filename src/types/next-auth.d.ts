import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    email: string;
    username: string;
    role: string;
    image?: string;
    session_id?: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
