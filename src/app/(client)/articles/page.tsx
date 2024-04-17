import ArticleTeasers from "@/components/article-teasers";
import { TypographyH1 } from "@/components/typography";
import { getArticles } from "@/lib/sanity/client";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getArticles();

  const validatedArticleTeasers = articles.reduce(
    (articles: ArticleTeaser[], article: any) => {
      const validatedArticleTeaser = validateAndCleanupArticleTeaser(article);
      return validatedArticleTeaser
        ? [...articles, validatedArticleTeaser]
        : articles;
    },
    [],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="grid gap-6">
        <TypographyH1>Articles</TypographyH1>

        {validatedArticleTeasers ? (
          <ArticleTeasers articles={validatedArticleTeasers} />
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
}
