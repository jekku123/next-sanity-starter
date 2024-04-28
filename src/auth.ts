import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { client } from "./lib/sanity/client";

import bcrypt from "bcryptjs";

import { env } from "@/env";
import GitHub from "next-auth/providers/github";
import { authConfig } from "./auth.config";
import { getAccountByUserId } from "./lib/auth/data-access/account";
import { getUserById } from "./lib/auth/data-access/user";
import { SanityAdapter } from "./lib/auth/sanity-adapter";
import { LoginSchema } from "./lib/zod/auth-forms";
import { UserRole } from "./types/authentication";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  secret: env.NEXTAUTH_SECRET,

  adapter: SanityAdapter(client),
  session: { strategy: "jwt" },
  trustHost: true, // Required to run CI e2e tests with cypress

  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const user_qry = `*[_type == "user" && email == "${credentials?.email}"][0]`;
        const user = await client.fetch(user_qry);

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials?.password as string,
          user.password,
        );

        if (passwordsMatch) {
          return {
            id: user._id,
            role: user.role,
            ...user,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser._id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
    ...authConfig.callbacks,
  },
});
