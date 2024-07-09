import { Submission } from "@/lib/zod/submission";
import SubmissionEntity from "../entities/submission.entity";

export type SubmissionDto = {
  id: string;
  name: string;
  email: string;
  message: string;
  userId: string;
  createdAt: string;
};

export type CreateSubmissionDto = {
  name: string;
  email: string;
  message: string;
  userId: string;
};

export type CreateSubmission = (
  submission: CreateSubmissionDto,
) => Promise<void>;

export type GetSubmissionById = (
  id: string,
) => Promise<SubmissionDto | undefined>;

export type GetSubmissionsByUserId = (
  userId: string,
) => Promise<SubmissionDto[]>;

export type DeleteSubmission = (id: string) => Promise<void>;

export function submissionEntityToCreateSubmissionDtoMapper(
  submission: SubmissionEntity,
): CreateSubmissionDto {
  return {
    name: submission.getName(),
    email: submission.getEmail(),
    message: submission.getMessage(),
    userId: submission.getUserId(),
  };
}

export function submissionEntityToDtoMapper(
  submission: SubmissionEntity,
): SubmissionDto {
  return {
    id: submission.getId()!,
    name: submission.getName(),
    email: submission.getEmail(),
    message: submission.getMessage(),
    userId: submission.getUserId(),
    createdAt: submission.getCreatedAt()!,
  };
}

export function submissionToDtoMapper(submission: Submission): SubmissionDto {
  return {
    id: submission._id,
    name: submission.name,
    email: submission.email,
    message: submission.message,
    userId: submission.user?._id,
    createdAt: submission._createdAt,
  };
}
