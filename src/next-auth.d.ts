import { type DefaultSession } from "next-auth";
import { UserRole } from "./types/authentication";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    role: UserRole;
    isOAuth: boolean;
  }
}
