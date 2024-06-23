import { getTranslations } from "next-intl/server";
import * as z from "zod";

export const contactFormBaseSchema = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) =>
  z.object({
    name: z.string().min(1, {
      message: name,
    }),
    email: z.string().email({
      message: email,
    }),
    message: z.string().min(6, {
      message: message,
    }),
  });

type Success = {
  success: true;
  data: ContactFormType;
};

type Failure = {
  success: false;
  errors: {
    name: string;
    email: string;
    message: string;
  };
};

export type ValidationResult = Success | Failure;

export async function validateSubmission(
  values: any,
): Promise<ValidationResult> {
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
        name: errors.name?.[0] ?? "",
        email: errors.email?.[0] ?? "",
        message: errors.message?.[0] ?? "",
      },
    };
  }

  return {
    success: true,
    data: validatedFields.data,
  };
}

export type ContactFormType = z.infer<ReturnType<typeof contactFormBaseSchema>>;
