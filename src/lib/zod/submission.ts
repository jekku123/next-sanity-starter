import { z } from "zod";

export const SubmissionSchema = z.object({
  _id: z.string(),
  _createdAt: z.string(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  user: z.object({
    _id: z.string(),
  }),
});
// .transform((data) => {
//   return {
//     id: data._id,
//     createdAt: data._createdAt,
//     name: data.name,
//     email: data.email,
//     message: data.message,
//     userId: data.user._id,
//   };
// });

export function validateAndCleanupSubmission(
  submission: any,
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
