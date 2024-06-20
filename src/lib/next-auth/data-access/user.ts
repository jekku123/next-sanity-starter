import "server-only";

import { client } from "@/lib/sanity/client";
import { User } from "@/types/authentication";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const userQry = `*[_type == "user" && email == "${email}"][0]`;
    const user = await client.fetch(userQry);

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (_id: string): Promise<User | null> => {
  try {
    const userQry = `*[_type == "user" && _id == "${_id}"][0]`;
    const user = await client.fetch(userQry);

    return user;
  } catch {
    return null;
  }
};
