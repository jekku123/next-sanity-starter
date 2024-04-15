import { getArticles } from "@/lib/sanity/client";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { ArticlesListing } from "@/lib/zod/section";
import ArticleTeasers from "../article-teasers";

export const revalidate = 60;

export default async function ArticlesListingSection({
  content,
}: {
  content: ArticlesListing;
}) {
  const articles = await getArticles({ limit: content.limit || undefined });

  const validatedArticles = articles.reduce(
    (articles: ArticleTeaser[], article: any) => {
      const validatedArticle = validateAndCleanupArticleTeaser(article);
      return validatedArticle ? [...articles, validatedArticle] : articles;
    },
    [],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      {validatedArticles ? (
        <ArticleTeasers articles={validatedArticles} title={content.title} />
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
}
