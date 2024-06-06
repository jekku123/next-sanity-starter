import { auth } from "@/lib/next-auth/auth";

import createIntlMiddleware from "next-intl/middleware";
import { NextAuthRequest } from "node_modules/next-auth/lib";
import { locales } from "./i18n";
import {
  DEFAULT_LOGIN_PATH,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./lib/next-auth/routes";

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

const authMiddleware = auth(
  // @ts-ignore - next-auth types are not up to date
  function onSuccess(req) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isStudioRoute = nextUrl.pathname.startsWith("/studio");

    if (isPublicRoute) {
      return void null;
    }

    if (isStudioRoute) {
      return void null;
    }

    if (isApiAuthRoute) {
      return void null;
    }

    if (isAuthRoute && isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (isProtectedRoute && !isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl));
    }
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }: { token: string }) => token != null,
    },
  },
);

export default function middleware(req: NextAuthRequest) {
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
