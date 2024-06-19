import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { client } from "../client";

export async function getArticles({
  limit,
  order = "desc",
  language = "en",
}: {
  limit?: number;
  order?: "asc" | "desc";
  language?: string;
} = {}): Promise<ArticleTeaser[] | null> {
  const query = `*[_type == "article" && language == $language]${
    order ? `| order(_createdAt ${order})` : ""
  }${limit ? `[0...${limit}]` : ""} {
      _id,
      _type,
      title,
      description,
      slug,
      image,
      tags,
      _createdAt,
    }`;

  const resource = await client.fetch(query, { language });

  const validatedArticleTeasers = resource
    .map((article: any) => validateAndCleanupArticleTeaser(article))
    .filter(Boolean) as ArticleTeaser[];

  return validatedArticleTeasers;
}
