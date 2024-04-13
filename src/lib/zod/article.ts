import { z } from "zod";
import { BlockSchema } from "./block";
import { ImageSchema } from "./image";

const ArticleSchema = z.object({
  _type: z.literal("article"),
  _id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  image: ImageSchema,
  body: BlockSchema,
});

export function validateAndCleanupArticle(article: any): Article | null {
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
