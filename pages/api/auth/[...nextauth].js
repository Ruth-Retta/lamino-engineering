import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import Admin from '../../../models/Admin';
import jwt from 'jsonwebtoken';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        const admin = await Admin.findOne({ email: credentials.email });
        if (admin && await compare(credentials.password, admin.password)) {
          return { id: admin._id, email: admin.email, role: 'admin' };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      // Generate a JWT for API authentication
      session.apiToken = jwt.sign(
        { id: token.id, email: token.email, role: token.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);