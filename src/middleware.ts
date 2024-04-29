import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_PATH,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return void null;
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

  return void null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: ["/((?!api|static|.*\\..*|_next).*)"],
// };
