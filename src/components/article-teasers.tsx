import { formatDate } from "@/lib/utils";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import Link from "next/link";
import { SanityImage } from "./sanity-image";
import { AspectRatio } from "./ui/aspect-ratio";

export default function ArticleTeasers({
  articles,
}: {
  articles: ArticleTeaserType[];
}) {
  return (
    <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleTeaser key={article?._id} article={article} />
      ))}
    </div>
  );
}

export function ArticleTeaser({ article }: { article: ArticleTeaserType }) {
  const date = formatDate(article._createdAt);

  return (
    <Link
      href={`/${article.slug.current}`}
      className="group grid h-full rounded-3xl pb-3 shadow-md shadow-muted transition-all"
      data-test-id={`${article.slug.current}`}
    >
      {article.image && (
        <div className="mb-2 overflow-hidden rounded-t-xl">
          <AspectRatio
            ratio={16 / 9}
            className="transform transition-transform duration-700 group-hover:scale-110"
          >
            <SanityImage image={article.image} />
          </AspectRatio>
        </div>
      )}
      <div className="flex h-full flex-col p-3">
        <div className="mb-1 text-xs">
          <p className="uppercase text-muted-foreground">{date} </p>
          <p className="uppercase text-muted-foreground">
            {article.tags.map((tag) => tag).join(", ")}
          </p>
        </div>
        <h2 className="mt-1 line-clamp-2 text-xl font-bold text-secondary-foreground underline-offset-2 group-hover:underline">
          {article.title}
        </h2>
        <p className="mt-2 leading-5 text-muted-foreground">
          {article.description}
        </p>
      </div>
    </Link>
  );
}
