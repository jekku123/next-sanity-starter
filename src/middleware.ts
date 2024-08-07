import { auth } from "@/lib/next-auth/auth";

import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { NextAuthRequest } from "node_modules/next-auth/lib";
import { i18nMiddlewareConfig } from "./i18n";
import {
  DEFAULT_LOGIN_PATH,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  protectedRoutes,
} from "./lib/next-auth/routes";

const intlMiddleware = createIntlMiddleware(i18nMiddlewareConfig);

const authMiddleware = auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isStudioRoute = nextUrl.pathname.startsWith("/studio");

  if (isStudioRoute) {
    return NextResponse.next();
  }

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl));
  }
  return intlMiddleware(req);
});

export default function middleware(req: NextRequest) {
  // const publicPathnameRegex = RegExp(
  //   `^(/(${locales.join("|")}))?(${publicPages
  //     .flatMap((p) => (p === "/" ? ["", "/"] : p))
  //     .join("|")})/?$`,
  //   "i",
  // );
  // const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // if (isPublicPage) {
  //   return intlMiddleware(req);
  // } else {
  return (authMiddleware as any)(req);
  // }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
