import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialsEmail = process.env.credentialsEmail;
const credentialsPassword = process.env.credentialsPassword;

export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        
        if (credentials.email === credentialsEmail && credentials.password === credentialsPassword) {
          return { id: 1, name: 'Admin', email: credentialsEmail, role: 'admin' };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});
