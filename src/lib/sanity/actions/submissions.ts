"use server";

import { currentUser } from "@/lib/next-auth/utils/auth";
import { ContactFormType, validateSubmission } from "@/lib/zod/contact-form";
import { revalidatePath } from "next/cache";
import {
  createSubmission,
  deleteSubmission,
  getSubmissionById,
} from "../data-access/submissions";
import {
  createSubmissionUseCase,
  deleteSubmissionUseCase,
} from "../use-cases/submission.use-cases";

export async function createSubmissionAction(values: ContactFormType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const validatedFields = await validateSubmission(values);

  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.errors };
  }

  try {
    await createSubmissionUseCase(validatedFields.data, user, {
      createSubmission: createSubmission,
    });
    revalidatePath("/settings/submissions");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

export async function deleteSubmissionAction(id: string) {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    await deleteSubmissionUseCase(id, user, {
      getSubmissionById: getSubmissionById,
      deleteSubmission: deleteSubmission,
    });
    revalidatePath("/settings/submissions");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: error };
  }
}
