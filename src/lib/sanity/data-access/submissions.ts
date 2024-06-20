import "server-only";

import { Submission, validateAndCleanupSubmission } from "../../zod/submission";
import { client } from "../client";

export async function getSubmissionsByUserId(
  userId: string,
): Promise<Submission[]> {
  const query = `*[_type == "submission" && user._ref == $userId] {
    _id,
    _createdAt,
    name,
    email,
    message,
  }`;

  const submissions = await client.fetch(query, { userId });

  const validatedSubmissions = submissions
    .map((submission: any) => validateAndCleanupSubmission(submission))
    .filter(Boolean) as Submission[];

  return validatedSubmissions;
}
