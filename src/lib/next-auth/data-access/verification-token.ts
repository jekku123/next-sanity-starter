import "server-only";

import { client } from "@/lib/sanity/client";
import { VerificationToken } from "@/types/authentication";

export const getVerificationTokenByEmail = async (
  email: string,
): Promise<VerificationToken | null> => {
  try {
    const verTokenQry = `*[_type == "verificationToken" && identifier == "${email}"][0]`;
    const verToken = await client.fetch(verTokenQry);

    return verToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (
  token: string,
): Promise<VerificationToken | null> => {
  try {
    const verTokenQry = `*[_type == "verificationToken" && token == "${token}"][0]`;
    const verToken = await client.fetch(verTokenQry);

    return verToken;
  } catch (error) {
    return null;
  }
};
