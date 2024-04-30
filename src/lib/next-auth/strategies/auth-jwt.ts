import NextAuth from "next-auth";
import { client } from "../../sanity/client";

import { env } from "@/env";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { UserRole } from "../../../types/authentication";
import { LoginSchema } from "../../zod/auth-forms";
import { getAccountByUserId } from "../data-access/account";
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

  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
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

  adapter: SanityAdapter(client),
  session: { strategy: "jwt" },

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
  },
});