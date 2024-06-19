import { SanityDocument } from "next-sanity";
import { z } from "zod";

export const SubmissionSchema = z.object({
  _id: z.string(),
  _createdAt: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(6),
});

export function validateAndCleanupSubmission(
  submission: SanityDocument,
): Submission | null {
  try {
    return SubmissionSchema.parse(submission);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { name = "ZodError", issues = [] } = error;
      console.log(JSON.stringify({ name, issues, submission }, null, 2));
    }
    return null;
  }
}

export type Submission = z.infer<typeof SubmissionSchema>;