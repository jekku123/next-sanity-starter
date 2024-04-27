import { NextAuthConfig } from "next-auth";
import {
  DEFAULT_LOGIN_PATH,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";

export const authConfig = {
  pages: {
    signIn: "auth/login",
    error: "auth/error",
  },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;

      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

      if (isApiAuthRoute) {
        return true;
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }

      // if (!isLoggedIn && !isPublicRoute) {
      //   return Response.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl));
      // }

      if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
