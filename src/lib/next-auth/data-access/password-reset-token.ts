import "server-only";

import { sanityFetch } from "@/lib/sanity/client";
import { PasswordResetToken } from "@/types/authentication";

export const getPasswordResetTokenByEmail = async (
  email: string,
): Promise<PasswordResetToken | null> => {
  try {
    const passResetTokenQuery = `*[_type == "passwordResetToken" && identifier == $email][0]`;
    const passResetToken = await sanityFetch<PasswordResetToken>({
      query: passResetTokenQuery,
      params: { email },
    });

    return passResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (
  tokeni: string,
): Promise<PasswordResetToken | null> => {
  try {
    const passResetTokenQuery = `*[_type == "passwordResetToken" && token == $tokeni][0]`;
    const passResetToken = await sanityFetch<PasswordResetToken>({
      query: passResetTokenQuery,
      params: { tokeni },
    });

    return passResetToken;
  } catch (error) {
    return null;
  }
};
