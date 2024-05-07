"use server";

import { signIn } from "@/lib/next-auth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/next-auth/routes";
import { AuthError } from "next-auth";
import * as z from "zod";

import { getUserByEmail } from "@/lib/next-auth/data-access/user";

import { sendVerificationEmail } from "@/lib/next-auth/utils/mail";

import { generateVerificationToken } from "@/lib/next-auth/utils/tokens";
import { LoginSchema } from "@/lib/zod/auth-forms";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Account does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
}
