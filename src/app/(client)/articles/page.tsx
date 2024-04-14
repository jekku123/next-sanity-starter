import { TypographyH1 } from "@/components/typography";
import { SanityImage } from "@/components/ui/sanity-image";
import { getArticles } from "@/lib/sanity/client";
import { validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";
import Link from "next/link";

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getArticles();

  if (!articles) {
    return null;
  }

  const validatedArticles = articles.map((article) =>
    validateAndCleanupArticleTeaser(article),
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="flex flex-col gap-6">
        <TypographyH1>Articles</TypographyH1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {validatedArticles.map((article) => (
            <Link
              key={article?._id}
              className="rounded-md border border-border p-2"
              href={`/${article?.slug.current}`}
            >
              {article?.image && <SanityImage image={article?.image} />}
              <h2>{article?.title}</h2>
              <p>{article?.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
