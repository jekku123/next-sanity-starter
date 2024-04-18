import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { client } from "../client";

export async function getArticles({
  limit,
  order,
}: {
  limit?: number;
  order?: "asc" | "desc";
} = {}): Promise<ArticleTeaser[] | null> {
  const query = `*[_type == "article"]${
    order ? `| order(_createdAt ${order})` : ""
  }${limit ? `[0...${limit}]` : ""} {
      _id,
      _type,
      title,
      excerpt,
      slug,
      image,
      tags,
      _createdAt,
    }`;

  const resource = await client.fetch(query);

  const validatedArticleTeasers = resource.reduce(
    (articles: ArticleTeaser[], article: any) => {
      const validatedArticleTeaser = validateAndCleanupArticleTeaser(article);
      return validatedArticleTeaser
        ? [...articles, validatedArticleTeaser]
        : articles;
    },
    [],
  );

  return validatedArticleTeasers;
}
