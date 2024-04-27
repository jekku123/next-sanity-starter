"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { getPasswordResetTokenByToken } from "@/lib/auth/data-access/password-reset-token";
import { getUserByEmail } from "@/lib/auth/data-access/user";
import { client } from "@/lib/sanity/client";
import { NewPasswordSchema } from "@/lib/zod/auth-forms";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.identifier);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await client
    .patch(existingUser._id)
    .set({
      password: hashedPassword,
    })
    .commit();

  await client.delete(existingToken._id);

  return { success: "Password updated!" };
};
