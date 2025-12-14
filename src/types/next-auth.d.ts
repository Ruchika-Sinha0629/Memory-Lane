import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;      // added id
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
