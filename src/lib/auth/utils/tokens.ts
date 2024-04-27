import { getPasswordResetTokenByEmail } from "@/lib/auth/data-access/password-reset-token";
import { getVerificationTokenByEmail } from "@/lib/auth/data-access/verification-token";
import { client } from "../../sanity/client";

import { uuid } from "@sanity/uuid";

export const generateVerificationToken = async (email: string) => {
  const token = `token.${uuid()}`;

  //expires in 1hour
  const expires = new Date(new Date().getTime() + 3600 * 1000).toISOString();

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await client.delete(existingToken._id);
  }

  const verificationToken = await client.create({
    _type: "verificationToken",
    identifier: email,
    token,
    expires,
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = `token.${uuid()}`;

  //expires in 1hour
  const expires = new Date(new Date().getTime() + 3600 * 1000).toISOString();

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await client.delete(existingToken._id);
  }

  const passwordResetToken = await client.create({
    _type: "passwordResetToken",
    identifier: email,
    token,
    expires,
  });

  return passwordResetToken;
};
