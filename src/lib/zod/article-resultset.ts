import { z } from "zod";
import {
  ArticleTeaserSchema,
  validateAndCleanupArticleTeaser,
} from "./article-teaser";

export const ArticleResultSetSchema = z.object({
  items: z.array(ArticleTeaserSchema),
  total: z.number(),
});

export function validateAndCleanupArticleResultSet(
  resource: any,
): ArticleResultSet | null {
  try {
    const count = ArticleResultSetSchema.omit({
      items: true,
    }).parse(resource);

    const validatedArticleTeasers = resource.items
      .map((project: any) => validateAndCleanupArticleTeaser(project))
      .filter(Boolean);

    return {
      ...count,
      items: validatedArticleTeasers,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { name = "ZodError", issues = [] } = error;
      console.log(JSON.stringify({ name, issues, resource }, null, 2));
    }
    return null;
  }
}

export type ArticleResultSet = z.infer<typeof ArticleResultSetSchema>;
