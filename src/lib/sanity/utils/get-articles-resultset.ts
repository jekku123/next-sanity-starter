import { validateAndCleanupArticleResultSet } from "@/lib/zod/article-resultset";
import { client } from "../client";

export async function getArticlesResultSet({
  limit = 6,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
} = {}) {
  const query = `{
    "items": *[_type == "article"]|order(_createdAt desc)
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
     "total": count(*[_type == "article"])
}`;

  const articleResultSet = await client.fetch(query);

  const validatedArticleResultSet =
    validateAndCleanupArticleResultSet(articleResultSet);

  return {
    totalPages: validatedArticleResultSet?.total
      ? Math.ceil(validatedArticleResultSet.total / limit)
      : 0,
    items: validatedArticleResultSet?.items || [],
  };
}
