// import { z } from "zod";
// import { ImageSchema } from "./image";

// const ArticleTeaserSchema = z.object({
//   _type: z.literal("article"),
//   _id: z.string(),
//   title: z.string(),
//   excerpt: z.string(),
//   slug: z.object({
//     current: z.string(),
//   }),
//   image: ImageSchema,
// });

// export function validateAndCleanupArticleTeaser(
//   articleTeaser: any,
// ): ArticleTeaser | null {
//   try {
//     return ArticleTeaserSchema.parse(articleTeaser);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       const { name = "ZodError", issues = [] } = error;
//       console.log(JSON.stringify({ name, issues, articleTeaser }, null, 2));
//     }
//     return null;
//   }
// }

// export type ArticleTeaser = z.infer<typeof ArticleTeaserSchema>;

import { z } from "zod";

import { ArticleBaseSchema } from "@/lib/zod/article";

export const ArticleTeaserSchema = ArticleBaseSchema.extend({
  slug: z.object({
    current: z.string(),
  }),
});

export function validateAndCleanupArticleTeaser(
  articleTeaser: any,
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
