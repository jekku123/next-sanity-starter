"use server";

import { UserRole } from "@/models/typings";
import { currentRole } from "../utils/auth";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
