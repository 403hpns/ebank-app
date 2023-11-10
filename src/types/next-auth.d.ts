import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      login: string;
      accessToken: string;
    };
  }
}
