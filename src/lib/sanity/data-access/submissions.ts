import "server-only";

import { Submission, validateAndCleanupSubmission } from "@/lib/zod/submission";
import { client, sanityFetch } from "../client";
import {
  CreateSubmissionDto,
  SubmissionDto,
  submissionToDtoMapper,
} from "../dto/submission.dto";

export async function getSubmissionsByUserId(
  userId: string,
): Promise<SubmissionDto[]> {
  const query = `*[_type == "submission" && user._ref == $userId] {
    _id,
    _createdAt,
    name,
    email,
    message,
    user->{
      _id
    }
  }`;

  const submissions = await sanityFetch<Submission[]>({
    query,
    params: { userId },
  });

  const validatedSubmissions = submissions
    .map(validateAndCleanupSubmission)
    .filter(Boolean) as Submission[];

  return validatedSubmissions.map(submissionToDtoMapper);
}

export async function getSubmissionById(
  submissionId: string,
): Promise<SubmissionDto | undefined> {
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

  const validatedSubmission = validateAndCleanupSubmission(submission);

  if (!validatedSubmission) {
    return undefined;
  }

  return submissionToDtoMapper(validatedSubmission);
}

export async function deleteSubmission(submissionId: string) {
  await client.delete(submissionId);
}

export async function createSubmission(submission: CreateSubmissionDto) {
  await client.create({
    _type: "submission",
    ...submission,
    user: {
      _type: "reference",
      _ref: submission.userId,
    },
  });
}
