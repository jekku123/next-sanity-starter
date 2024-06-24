import "server-only";

import { sanityFetch } from "@/lib/sanity/client";
import { Account } from "@/types/authentication";

export const getAccountByUserId = async (
  userId: string,
): Promise<Account | null> => {
  try {
    const accountQuery = `*[_type == "account" && userId == $userId][0]`;
    const account = await sanityFetch<Account>({
      query: accountQuery,
      params: { userId },
    });
    return account;
  } catch {
    return null;
  }
};
