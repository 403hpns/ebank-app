import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { db } from "<app>/lib/db";
import { signJwtAccessToken } from "<app>/lib/jwt";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db),

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.login || !credentials?.password) {
          throw new Error("Credentials missing required fields");
        }

        const user = await db.user.findUnique({
          where: {
            login: credentials.login,
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error("Invalid credentials");
        }

        const { id, password, ...securedData } = user;
        const accessToken = signJwtAccessToken(securedData);

        return {
          id: user.id + "",
          ...securedData,
          accessToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
