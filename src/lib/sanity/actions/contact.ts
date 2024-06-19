"use server";

import { currentUser } from "@/lib/next-auth/utils/auth";
import { ContactFormType, contactFormBaseSchema } from "@/lib/zod/contact-form";
import { getTranslations } from "next-intl/server";
import { client } from "../client";

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

  const data = await client.create({
    _type: "submission",
    user: {
      _type: "reference",
      _ref: user.id,
    },
    name,
    email,
    message,
  });

  return { success: true, data };
}
