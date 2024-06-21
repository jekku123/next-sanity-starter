import { currentUser } from "@/lib/next-auth/utils/auth";
import { Submission, validateAndCleanupSubmission } from "@/lib/zod/submission";
import { User } from "next-auth";
import {
  deleteSubmission,
  getSubmissionById,
  getSubmissionsByUserId,
} from "../data-access/submissions";

function isAuthor(user: User, submission: Submission) {
  return user.id === submission.user?._id;
}

export async function getSubmissionsByUserIdUseCase(userId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user.id !== userId) {
    throw new Error("Forbidden");
  }

  const submissions = await getSubmissionsByUserId(userId);

  const validatedSubmissions = submissions
    .map((submission) => validateAndCleanupSubmission(submission))
    .filter(Boolean) as Submission[];

  return validatedSubmissions;
}

export async function deleteSubmissionUseCase(
  user: User,
  submissionId: string,
) {
  const submission = await getSubmissionById(submissionId);

  if (!submission) {
    throw new Error("Submission not found");
  }

  if (!isAuthor(user, submission)) {
    throw new Error("Forbidden");
  }

  await deleteSubmission(submissionId);

  return submissionId;
}
