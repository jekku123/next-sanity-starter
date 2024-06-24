"use server";

import { signOut } from "@/lib/next-auth/auth";

export const logoutAction = async () => {
  await signOut();
};
