import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { SanityAdapter } from "./lib/auth/sanity-adapter";
import { client } from "./lib/sanity/client";

import bcrypt from "bcryptjs";

import { getAccountByUserId } from "./lib/auth/data-access/account";
import { getTwoFactorConfirmationByUserId } from "./lib/auth/data-access/two-factor-confirmation";
import { getUserById } from "./lib/auth/data-access/user";
import { LoginSchema } from "./lib/zod/auth";
import { UserRole } from "./models/typings";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  //unstable update in Beta version
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        //if not using zod resolvers validated fields arent necessary
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const user_qry = `*[_type == "user" && email== "${credentials?.email}"][0]`;
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
  session: { strategy: "jwt" },
  adapter: SanityAdapter(client),
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      // prevent signIn without email verification
      if (!existingUser?.emailVerified) return false;

      // 2FA CHECK
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser._id,
        );

        if (!twoFactorConfirmation) return false;

        //Delete 2FA for next signin
        await client.delete(twoFactorConfirmation._id);
      }

      return true;
    },
    //@ts-ignore
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
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
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
});
