import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

import { env } from "@/env";
import { getUserByEmail } from "@/lib/next-auth/data-access/user";
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
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: SanityAdapter(client),
  session: { strategy: "jwt" },

  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email as string);

        if (!user || !user.emailVerified) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (passwordsMatch) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role as UserRole,
            isOAuth: false,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      // const existingUser = await getUserById(user.id!);
      // if (!existingUser?.emailVerified) return false;

      return true;
    },

    async jwt({ token, user }) {
      if (!token.sub || !user) return token;

      token.role = user.role;
      token.isOAuth = user.isOAuth === undefined ? true : user.isOAuth;

      return token;
    },

    async session({ session, token }) {
      if (!token.sub || !session.user) return session;

      session.user.id = token.sub;
      session.user.role = token.role as UserRole;
      session.user.isOAuth = token.isOAuth as boolean;

      return session;
    },
  },
});
