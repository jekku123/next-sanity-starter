import "server-only";

import { validateAndCleanupArticleResultSet } from "@/lib/zod/article-resultset";
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

export async function getArticlesResultSet({
  limit = 6,
  offset = 0,
  language = "en",
}: {
  limit?: number;
  offset?: number;
  language?: string;
} = {}) {
  const query = `{
    "items": *[_type == "article" && language == $language]|order(_createdAt desc)
    ${
      limit
        ? `[${offset ? offset : "0"}
    ...
    ${offset ? limit + offset : limit}]`
        : ""
    }
    {
      _id,
      _type,
      title,
      description,
      slug,
      image,
      tags,
      _createdAt,
    },
     "total": count(*[_type == "article" && language == $language])
}`;

  const articleResultSet = await client.fetch(query, { language });

  const validatedArticleResultSet =
    validateAndCleanupArticleResultSet(articleResultSet);

  return {
    totalPages: validatedArticleResultSet?.total
      ? Math.ceil(validatedArticleResultSet.total / limit)
      : 0,
    items: validatedArticleResultSet?.items || [],
  };
}
