import { getArticles } from "@/lib/sanity/client";
import {
  ArticleTeaser as ArticleTeaserType,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { ArticlesListing } from "@/lib/zod/section";
import Link from "next/link";
import ArticleTeasers from "../article-teasers";
import { TypographyH1 } from "../typography";
import { Button } from "../ui/button";

export default async function ArticlesListingSection({
  content,
}: {
  content: ArticlesListing;
}) {
  const articles = await getArticles({ limit: 3 });
  if (!articles) {
    return null;
  }

  const validatedArticles = articles.reduce(
    (articles: ArticleTeaserType[], article) => {
      const validatedArticle = validateAndCleanupArticleTeaser(article);
      if (validatedArticle) {
        return [...articles, validatedArticle];
      } else {
        return articles;
      }
    },
    [],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="flex flex-col gap-4">
        <TypographyH1>{content.title}</TypographyH1>
        <ArticleTeasers articles={validatedArticles} />
        <div className="place-self-center">
          <Button asChild>
            <Link href="/articles">View all articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
