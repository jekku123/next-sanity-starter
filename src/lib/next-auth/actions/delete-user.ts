"use server";

import { client } from "@/lib/sanity/client";
import { getUserById } from "../data-access/user";
import { currentUser } from "../utils/auth";

export async function deleteUserAction({ userId }: { userId: string }) {
  const user = await currentUser();

  if (!user || user.id !== userId) {
    return { error: "Not authorized" };
  }

  const dbUser = await getUserById(userId);

  if (!dbUser) {
    return { error: "User not found" };
  }

  await client.delete(userId);

  return { success: "User deleted" };
}
