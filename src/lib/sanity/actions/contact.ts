"use server";

import { ContactSchema } from "@/lib/zod/contact-form";
import { z } from "zod";
import { client } from "../client";

export async function sendContactFormAction(
  values: z.infer<typeof ContactSchema>,
) {
  const validatedFields = ContactSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, email, message } = validatedFields.data;

  const submission = await client.create({
    _type: "submission",
    name,
    email,
    message,
  });

  if (!submission) {
    return { error: "Submission failed" };
  }

  return { success: "Submission successful" };
}
