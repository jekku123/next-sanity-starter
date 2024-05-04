/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes: string[] = [
  // "/",
  // "/studio",
  // "/auth/new-verification",
];

/**
 * An array of routes that are protected
 * These routes require authentication and will redirect unauthenticated users to /auth/login
 */
export const protectedRoutes: string[] = ["/protected"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to DEFAULT_LOGIN_REDIRECT
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * string[] that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";

/**
 * The default login path
 */
export const DEFAULT_LOGIN_PATH: string = "/auth/login";
