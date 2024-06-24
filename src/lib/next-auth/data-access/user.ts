import "server-only";

import { sanityFetch } from "@/lib/sanity/client";
import { User } from "@/types/authentication";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const userQuery = `*[_type == "user" && email == $email][0]`;
    const user = await sanityFetch<User>({
      query: userQuery,
      params: { email },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userQuery = `*[_type == "user" && _id == $id][0]`;
    const user = await sanityFetch<User>({
      query: userQuery,
      params: { id },
    });

    return user;
  } catch {
    return null;
  }
};
