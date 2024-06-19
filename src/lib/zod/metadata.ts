import { SanityDocument } from "next-sanity";
import { z } from "zod";

export const MetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export function validateAndCleanupMetadata(
  resource: SanityDocument,
): Metadata | null {
  try {
    return MetadataSchema.parse(resource);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error as {
      name?: string;
      issues?: any[];
    };
    console.log(JSON.stringify({ name, issues, resource }, null, 2));
    return null;
  }
}

export type Metadata = z.infer<typeof MetadataSchema>;
