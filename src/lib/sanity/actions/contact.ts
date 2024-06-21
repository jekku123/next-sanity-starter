"use server";

import { currentUser } from "@/lib/next-auth/utils/auth";
import { ContactFormType, contactFormBaseSchema } from "@/lib/zod/contact-form";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { client } from "../client";
import { deleteSubmissionUseCase } from "../use-cases/submissions";

export async function sendContactFormAction(values: ContactFormType) {
  const user = await currentUser();

  if (!user) {
    return { success: false, errors: { name: "Unauthorized" } };
  }

  const t = await getTranslations("ContactForm");

  const translatedErrors = {
    name: t("errors.name"),
    email: t("errors.email"),
    message: t("errors.message"),
  };

  const validatedFields =
    contactFormBaseSchema(translatedErrors).safeParse(values);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      success: false,
      errors: {
        name: errors.name ?? "",
        email: errors.email ?? "",
        message: errors.message ?? "",
      },
    };
  }

  const { name, email, message } = validatedFields.data;

  await client.create({
    _type: "submission",
    user: {
      _type: "reference",
      _ref: user.id,
    },
    name,
    email,
    message,
  });

  revalidatePath("/settings/submissions");

  return { success: true };
}

export async function deleteSubmissionAction(id: string) {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    await deleteSubmissionUseCase(user, id);
    revalidatePath("/settings/submissions");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: error };
  }
}
