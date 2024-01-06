import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  callbacks: {
    async redirect() {
      return '/api/signup';
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
