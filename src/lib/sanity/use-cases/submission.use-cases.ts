import { currentUser } from "@/lib/next-auth/utils/auth";
import { ContactFormType } from "@/lib/zod/contact-form";
import { User } from "next-auth";
import { getSubmissionsByUserId } from "../data-access/submissions";
import {
  CreateSubmission,
  DeleteSubmission,
  GetSubmissionById,
  SubmissionDto,
} from "../dto/submission.dto";
import SubmissionEntity from "../entities/submission.entity";

function isAuthor(user: User, submission: SubmissionDto) {
  return user.id === submission.userId;
}

export async function getSubmissionsByUserIdUseCase(
  userId: string,
): Promise<SubmissionDto[]> {
  const user = await currentUser();

  if (!user || user.id !== userId) {
    throw new Error("Unauthorized");
  }

  const submissions = await getSubmissionsByUserId(userId);

  return submissions;
}

export async function deleteSubmissionUseCase(
  submissionId: string,
  user: User,
  ctx: {
    getById: GetSubmissionById;
    delete: DeleteSubmission;
  },
) {
  const submission = await ctx.getById(submissionId);

  if (!submission) {
    throw new Error("Submission not found");
  }

  if (!isAuthor(user, submission)) {
    throw new Error("Forbidden");
  }

  await ctx.delete(submissionId);

  return submissionId;
}

export async function createSubmissionUseCase(
  values: ContactFormType,
  user: User,
  ctx: {
    create: CreateSubmission;
  },
): Promise<void> {
  const submission = new SubmissionEntity({
    ...values,
    userId: user.id!,
  });

  await ctx.create(submission.toCreateSubmissionDto());
}
