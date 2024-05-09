"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { unstable_update } from "@/lib/next-auth/auth";
import { getUserByEmail, getUserById } from "@/lib/next-auth/data-access/user";
import { sendVerificationEmail } from "@/lib/next-auth/utils/mail";
import { client } from "@/lib/sanity/client";
import { SettingsSchema } from "@/lib/zod/auth-forms";
import { currentUser } from "../utils/auth";
import { generateVerificationToken } from "../utils/tokens";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser._id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await client
    .patch(dbUser._id)
    .set({
      ...values,
    })
    .commit();

  //unstable update in Beta version
  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });

  return { success: "Settings Updated!" };
};
