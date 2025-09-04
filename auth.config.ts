import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      id: 'credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        try {
          const { username, password } = credentials;
          const res = await fetch(
            `http://127.0.0.1:8003/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              // credentials: 'include',
              body: JSON.stringify({ username, password })
            }
          );

          if (res.status === 401) {
            return null;
          }

          const result = await res.json();

          if (res.ok) {
            const user = result;
            console.log(user, 'logged in user');

            return user;
          } else {
            console.log(result, 'logged in user');

            throw new Error('Invalid login credentials');
          }
        } catch (error: any) {
          console.log(error, 'logged in user');

          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/sign-in'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 1 day
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true
} satisfies NextAuthConfig;

export default authConfig;
