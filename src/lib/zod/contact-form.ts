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

export type ContactFormType = z.infer<ReturnType<typeof contactFormBaseSchema>>;
