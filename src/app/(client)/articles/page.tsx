import { TypographyH1 } from "@/components/typography";
import { SanityImage } from "@/components/ui/sanity-image";
import { getArticles } from "@/lib/sanity/client";
import { validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = await getArticles();

  if (!articles) {
    return null;
  }

  const validatedArticles = articles.map((article) =>
    validateAndCleanupArticleTeaser(article),
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col">
      <TypographyH1>Articles</TypographyH1>
      <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-3">
        {validatedArticles.map((article) => {
          return (
            <Link
              key={article?._id}
              className="rounded-md border border-border p-2"
              href={`/${article?.slug.current}`}
            >
              {article?.image && <SanityImage image={article?.image} />}
              <h2>{article?.title}</h2>
              <p>{article?.excerpt}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
