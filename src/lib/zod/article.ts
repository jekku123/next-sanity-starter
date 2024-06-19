import { z } from "zod";

import { SanityDocument } from "next-sanity";
import { ImageSchema } from "./image";
import { PortableTextSchema } from "./portable-text";

export const ArticleBaseSchema = z.object({
  _type: z.literal("article"),
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  image: ImageSchema,
  tags: z.array(z.string()),
  _createdAt: z.string(),
});

const ArticleSchema = ArticleBaseSchema.extend({
  _updatedAt: z.string().optional().nullable(),
  body: PortableTextSchema,
});

export function validateAndCleanupArticle(
  article: SanityDocument,
): Article | null {
  try {
    return ArticleSchema.parse(article);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { name = "ZodError", issues = [] } = error;
      console.log(JSON.stringify({ name, issues, article }, null, 2));
    }
    return null;
  }
}

export type Article = z.infer<typeof ArticleSchema>;
