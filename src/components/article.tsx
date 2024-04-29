import { formatDateFull } from "@/lib/utils";
import { Article as ArticleType } from "@/lib/zod/article";
import BlockContent from "./block-content";
import { SanityImage } from "./sanity-image";
import { TypographyH1, TypographySmall } from "./typography";
import { PreviousPageButton } from "./ui/previous-page-button";

export default function Article({ article }: { article: ArticleType }) {
  const date = formatDateFull(article._createdAt);

  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="grid gap-6">
        <PreviousPageButton variant="outline" />
        <TypographyH1>{article.title}</TypographyH1>
        <TypographySmall>{date}</TypographySmall>
        <SanityImage image={article.image} className="rounded-xl" />
        <BlockContent content={article.body} />
      </div>
    </article>
  );
}
