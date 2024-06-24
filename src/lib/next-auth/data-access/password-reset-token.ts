import "server-only";

import { client } from "@/lib/sanity/client";
import { PasswordResetToken } from "@/types/authentication";

export const getPasswordResetTokenByEmail = async (
  email: string,
): Promise<PasswordResetToken | null> => {
  try {
    const passResetTokenQry = `*[_type == "passwordResetToken" && identifier == "${email}"][0]`;
    const passResetToken = await client.fetch(passResetTokenQry);

    return passResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (
  token: string,
): Promise<PasswordResetToken | null> => {
  try {
    const passResetTokenQry = `*[_type == "passwordResetToken" && token == "${token}"][0]`;
    const passResetToken = await client.fetch(passResetTokenQry);

    return passResetToken;
  } catch (error) {
    return null;
  }
};
