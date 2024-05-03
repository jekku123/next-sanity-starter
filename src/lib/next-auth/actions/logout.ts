"use server";

import { signOut } from "@/lib/next-auth/auth";

export const logout = async () => {
  await signOut();
};
