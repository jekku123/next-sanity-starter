import "server-only";

import { client } from "@/lib/sanity/client";
import { Account } from "@/types/authentication";

export const getAccountByUserId = async (
  userId: string,
): Promise<Account | null> => {
  try {
    const accountQry = `*[_type == "account" && userId == "${userId}"][0]`;
    const account = await client.fetch(accountQry);
    return account;
  } catch {
    return null;
  }
};
