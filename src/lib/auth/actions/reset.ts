"use server";

import * as z from "zod";

import { getUserByEmail } from "@/lib/auth/data-access/user";
import { sendPasswordResetEmail } from "@/lib/auth/utils/mail";
import { ResetSchema } from "@/lib/zod/auth-forms";
import { generatePasswordResetToken } from "../utils/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.identifier,
    passwordResetToken.token,
  );

  return { success: "Reset password email sent!" };
};
