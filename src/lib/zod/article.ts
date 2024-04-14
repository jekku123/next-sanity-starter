// import { z } from "zod";
// import { BlockSchema } from "./block";
// import { ImageSchema } from "./image";

// const ArticleSchema = z.object({
//   _type: z.literal("article"),
//   _id: z.string(),
//   title: z.string(),
//   excerpt: z.string(),
//   slug: z.object({
//     current: z.string(),
//   }),
//   image: ImageSchema,
//   body: BlockSchema,
// });

// export function validateAndCleanupArticle(article: any): Article | null {
//   try {
//     return ArticleSchema.parse(article);
//   } catch (error) {
// if (error instanceof z.ZodError) {
//   const { name = "ZodError", issues = [] } = error;
//   console.log(JSON.stringify({ name, issues, article }, null, 2));
// }
// return null;
//   }
// }

// export type Article = z.infer<typeof ArticleSchema>;

import { z } from "zod";

import { BlockSchema } from "./block";
import { ImageSchema } from "./image";
import { SanityDocument } from "next-sanity";

export const ArticleBaseSchema = z.object({
  _type: z.literal("article"),
  _id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  image: ImageSchema,
  tags: z.array(z.string()),
});

const ArticleSchema = ArticleBaseSchema.extend({
  body: BlockSchema,
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
