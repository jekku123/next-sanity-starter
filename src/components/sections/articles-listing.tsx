import { getArticles } from "@/lib/sanity/client";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { ArticlesListing } from "@/lib/zod/section";
import Link from "next/link";
import ArticleTeasers from "../article-teasers";
import { TypographyH1 } from "../typography";
import { Button } from "../ui/button";

export const revalidate = 60;

export default async function ArticlesListingSection({
  content,
}: {
  content: ArticlesListing;
}) {
  const articles = await getArticles({ limit: content.limit || undefined });

  const validatedArticleTeasers = articles.reduce(
    (articles: ArticleTeaser[], article: any) => {
      const validatedArticle = validateAndCleanupArticleTeaser(article);
      return validatedArticle ? [...articles, validatedArticle] : articles;
    },
    [],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="flex flex-col gap-6">
        <TypographyH1>Articles</TypographyH1>

        {validatedArticleTeasers ? (
          <ArticleTeasers articles={validatedArticleTeasers} />
        ) : (
          <p>No articles found</p>
        )}

        <div className="place-self-center">
          <Button asChild>
            <Link href="/articles">View all articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
