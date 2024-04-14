import { z } from "zod";

import { ArticleBaseSchema } from "@/lib/zod/article";
import { SanityDocument } from "next-sanity";

export const ArticleTeaserSchema = ArticleBaseSchema.extend({
  slug: z.object({
    current: z.string(),
  }),
});

export function validateAndCleanupArticleTeaser(
  articleTeaser: SanityDocument,
): ArticleTeaser | null {
  try {
    return ArticleTeaserSchema.parse(articleTeaser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { name = "ZodError", issues = [] } = error;
      console.log(JSON.stringify({ name, issues, articleTeaser }, null, 2));
    }
    return null;
  }
}

export type ArticleTeaser = z.infer<typeof ArticleTeaserSchema>;
