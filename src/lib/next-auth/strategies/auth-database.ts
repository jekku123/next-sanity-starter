import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { env } from "@/env";
import { SanityAdapter } from "@/lib/next-auth/sanity-adapter";
import { client } from "@/lib/sanity/client";
import { UserRole } from "@/types/authentication";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  trustHost: true, // Required to run CI e2e tests with cypress
  pages: {
    signIn: "auth/login",
    error: "auth/error",
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: SanityAdapter(client),
  session: { strategy: "database" },

  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (user.id && session.user) {
        session.user.id = user.id;
      }

      if (user.role && session.user) {
        session.user.role = user.role as UserRole;
      }

      if (session.user) {
        session.user.name = user.name;
        session.user.email = user.email as string;
      }

      return session;
    },
  },
});
