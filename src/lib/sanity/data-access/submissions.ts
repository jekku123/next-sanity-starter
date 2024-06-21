import "server-only";

import { Submission } from "@/lib/zod/submission";
import { client, sanityFetch } from "../client";

export async function getSubmissionsByUserId(userId: string) {
  const query = `*[_type == "submission" && user._ref == $userId] {
    _id,
    _createdAt,
    name,
    email,
    message,
  }`;

  const submissions = await sanityFetch<Submission[]>({
    query,
    params: { userId },
  });

  return submissions;
}

export async function getSubmissionById(submissionId: string) {
  const query = `*[_type == "submission" && _id == $submissionId][0] {
    _id,
    _createdAt,
    name,
    email,
    message,
    user->{
      _id
    }
  }`;

  const submission = await sanityFetch<Submission>({
    query,
    params: { submissionId },
  });

  return submission;
}

export async function deleteSubmission(submissionId: string) {
  return await client.delete(submissionId);
}
