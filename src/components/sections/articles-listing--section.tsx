import { getArticles } from "@/lib/sanity/utils/get-articles";
import { ArticlesListing } from "@/lib/zod/section";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("ArticlesListingSection");

  return (
    <div className="flex flex-col gap-6">
      <TypographyH1>{content.title}</TypographyH1>

      {articles ? (
        <ArticleTeasers articles={articles} />
      ) : (
        <p>{t("no-articles")}</p>
      )}

      <div className="place-self-center">
        <Button asChild>
          <Link href="/articles">{t("view-all-articles")}</Link>
        </Button>
      </div>
    </div>
  );
}
