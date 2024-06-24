import "server-only";

import { sanityFetch } from "@/lib/sanity/client";
import { VerificationToken } from "@/types/authentication";

export const getVerificationTokenByEmail = async (
  email: string,
): Promise<VerificationToken | null> => {
  try {
    const verificationTokenQuery = `*[_type == "verificationToken" && identifier == $email][0]`;
    const verificationToken = await sanityFetch<VerificationToken>({
      query: verificationTokenQuery,
      params: { email },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (
  tokeni: string,
): Promise<VerificationToken | null> => {
  try {
    const verificationTokenQuery = `*[_type == "verificationToken" && token == $tokeni][0]`;
    const verificationToken = await sanityFetch<VerificationToken>({
      query: verificationTokenQuery,
      params: { tokeni },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
