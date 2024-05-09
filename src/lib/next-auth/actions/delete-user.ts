"use server";

import { client } from "@/lib/sanity/client";
import { getUserById } from "../data-access/user";
import { currentUser } from "../utils/auth";

export async function deleteUserAction({ userId }: { userId: string }) {
  try {
    const sessionUser = await currentUser();

    if (!sessionUser || sessionUser.id !== userId) {
      return { error: "Not authorized" };
    }

    const user = await getUserById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    await client.delete(user._id);

    return { success: "User deleted" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}
