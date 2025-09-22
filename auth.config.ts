import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

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
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ username, password })
            }
          );

          if (res.status === 401) {
            return null;
          }

          const result = await res.json();

          if (res.ok) {
            const user = result;

            return user;
          } else {
            throw new Error('Invalid login credentials');
          }
        } catch (error: any) {
          return null;
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
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
    async jwt({ token, user, account, profile }) {
      if (user && account?.provider === 'credentials') {
        return { ...token, ...user };
      }

      if (account?.provider === 'google') {
        console.log('[OAuth Debug] Google account:', account);
          console.log('[OAuth Debug] Google profile:', profile);
          console.log('[OAuth Debug] Current token before merge:', token);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/google-login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id_token: (account as any).id_token,
                access_token: account.access_token,
                email: (profile as any)?.email
              })
            }
          );

          if (!res.ok) {
            return token;
          }

          const appSession = await res.json();
          return { ...token, ...appSession };
        } catch (error) {
          return token;
        }
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
