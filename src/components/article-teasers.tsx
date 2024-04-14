import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import Link from "next/link";
import { SanityImage } from "./ui/sanity-image";

export default function ArticleTeasers({
  articles,
}: {
  articles: ArticleTeaserType[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {articles.map((article) => {
        return <ArticleTeaser key={article?._id} article={article} />;
      })}
    </div>
  );
}

export function ArticleTeaser({ article }: { article: ArticleTeaserType }) {
  return (
    <Link
      className="rounded-md border border-border p-2"
      href={`/${article.slug.current}`}
    >
      <SanityImage image={article.image} />
      <span>{article.tags.map((tag) => tag).join(", ")}</span>
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
    </Link>
  );
}
