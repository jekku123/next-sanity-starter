"use server";

import { getUserByEmail } from "@/lib/next-auth/data-access/user";
import { sendVerificationEmail } from "@/lib/next-auth/utils/mail";
import { client } from "@/lib/sanity/client";
import { RegisterSchema } from "@/lib/zod/auth-forms";

import { UserRole } from "@/types/authentication";
import { uuid } from "@sanity/uuid";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { generateVerificationToken } from "../utils/tokens";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already being used" };
  }

  await client.create({
    _type: "user",
    _id: `user.${uuid()}`,
    name,
    email,
    role: UserRole.USER,
    password: hashedPassword,
    emailVerified: process.env.NODE_ENV !== "development",
  });

  if (process.env.NODE_ENV === "development") {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token,
    );

    return { success: "Confirmation email sent" };
  }

  return { success: "Successfully signed up!" };
};
