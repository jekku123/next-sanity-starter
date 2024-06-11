import { useTranslations } from "next-intl";
import * as z from "zod";

export const contactFormBaseSchema = (
  t: ReturnType<typeof useTranslations<"ContactForm">>,
) =>
  z.object({
    name: z.string().min(1, {
      message: t("errors.name"),
    }),
    email: z.string().email({
      message: t("errors.email"),
    }),
    message: z.string().min(6, {
      message: t("errors.message"),
    }),
  });

export type ContactFormType = z.infer<ReturnType<typeof contactFormBaseSchema>>;
