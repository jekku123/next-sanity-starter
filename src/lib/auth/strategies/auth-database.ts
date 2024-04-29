import NextAuth from "next-auth";
import { client } from "../../sanity/client";

import { env } from "@/env";
import GitHub from "next-auth/providers/github";
import { UserRole } from "../../../types/authentication";
import { getUserById } from "../data-access/user";
import { SanityAdapter } from "../sanity-adapter";

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

  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      return true;
    },

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
