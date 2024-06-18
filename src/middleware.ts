import { auth } from "@/lib/next-auth/auth";

import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n";
import {
  DEFAULT_LOGIN_PATH,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  protectedRoutes,
} from "./lib/next-auth/routes";

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

const authMiddleware = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isStudioRoute = nextUrl.pathname.startsWith("/studio");

  if (isStudioRoute) {
    return void null;
  }

  if (isApiAuthRoute) {
    return void null;
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

// export default auth((req) => {
// const { nextUrl } = req;
// const isLoggedIn = !!req.auth;

// const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
// const isAuthRoute = authRoutes.includes(nextUrl.pathname);
// const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

// if (isApiAuthRoute) {
//   return void null;
// }

// if (isAuthRoute && isLoggedIn) {
//   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
// }

// if (isProtectedRoute && !isLoggedIn) {
//   return Response.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl));
// }

//   return void null;
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
