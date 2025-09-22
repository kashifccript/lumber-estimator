import CredentialsProvider from 'next-auth/providers/credentials';
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
          } else {
            throw new Error('Invalid login credentials');
          }
        } catch (error: any) {
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
    async jwt({ token, user }: any) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token as any;
      return session;
    },
    async signIn({ user }: any) {
      console.log('user', user);
      if (user?.error) {
        throw new Error(user?.error);
      }
      return true;
    }
  },
  secret: process.env.AUTH_SECRET
};

export default authOptions;
