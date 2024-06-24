import "next-auth";
import { DefaultSession } from "next-auth";
import { UserRole } from "./authentication";

export type SessionUser =
  | (User & {
      role: UserRole;
      isOAuth: boolean;
    })
  | undefined;

// declare module "next-auth" {
//   interface User {
//     role: UserRole;
//     isOAuth: boolean;
//   }
// }

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: {
      role: UserRole;
      isOAuth: boolean;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    isOAuth?: boolean;
  }
}
