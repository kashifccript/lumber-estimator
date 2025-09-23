import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
const authOptions = {
  providers: [
    CredentialsProvider({
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

          const result = await res.json();

          if (!res.ok && result) {
            return { status: false, error: result?.detail };
          }

          if (res.ok) {
            const user = result;

            return user as any;
          }
        } catch (error: any) {
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 1 day
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user && !account?.backendUser) {
        return { ...token, ...user };
      }
      if (account?.backendUser) {
        token.user = account.backendUser.user;
        token.access_token = account.backendUser.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token as any;
      return session;
    },
    async signIn({ user, account }: any) {
      if (user?.error) {
        throw new Error(user?.error);
      }
      if (account?.provider === 'google') {
        const id_token = account.id_token;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/google/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_token, role: 'estimator' })
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.detail?.message || data?.detail);
        }
        (account as any).backendUser = data;
      }
      return true;
    }
  },
  secret: process.env.AUTH_SECRET
};

export default authOptions;
