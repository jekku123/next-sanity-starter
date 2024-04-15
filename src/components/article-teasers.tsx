import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import Link from "next/link";
import { TypographyH1 } from "./typography";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { SanityImage } from "./ui/sanity-image";

export default function ArticleTeasers({
  articles,
  title,
}: {
  articles: ArticleTeaserType[];
  title: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <TypographyH1>{title}</TypographyH1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleTeaser key={article?._id} article={article} />
        ))}
      </div>
      <div className="place-self-center">
        <Button asChild>
          <Link href="/articles">View all articles</Link>
        </Button>
      </div>
    </div>
  );
}

export function ArticleTeaser({ article }: { article: ArticleTeaserType }) {
  return (
    <Link
      href={article.slug.current}
      className="group grid h-full rounded-3xl pb-3 shadow-md shadow-muted transition-all"
    >
      {article.image && (
        <div className="mb-2 overflow-hidden rounded-t-xl">
          <AspectRatio
            ratio={16 / 9}
            className="transform transition-transform duration-700 group-hover:scale-110"
          >
            <SanityImage image={article.image} fill />
          </AspectRatio>
        </div>
      )}
      <div className="flex h-full flex-col p-3">
        <div className="mb-1 text-xs">
          <span className="uppercase text-muted-foreground">
            {article.tags.map((tag) => tag).join(", ")}
          </span>
        </div>
        <h3 className="mt-1 line-clamp-2 text-xl font-bold text-secondary-foreground underline-offset-2 group-hover:underline">
          {article.title}
        </h3>
        <p className="mt-2 leading-5 text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
