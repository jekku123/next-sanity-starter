import { getArticles } from "@/lib/sanity/utils/get-articles";
import { ArticlesListing } from "@/lib/zod/section";
import Link from "next/link";
import ArticleTeasers from "../documents/article-teasers";
import { TypographyH1 } from "../typography";
import { Button } from "../ui/button";

export const revalidate = 60;

export default async function ArticlesListingSection({
  content,
}: {
  content: ArticlesListing;
}) {
  const articles = await getArticles({ limit: content.limit || undefined });

  return (
    <div className="flex flex-col gap-6">
      <TypographyH1>{content.title}</TypographyH1>

      {articles ? (
        <ArticleTeasers articles={articles} />
      ) : (
        <p>No articles found</p>
      )}

      <div className="place-self-center">
        <Button asChild>
          <Link href="/articles">View all articles</Link>
        </Button>
      </div>
    </div>
  );
}
