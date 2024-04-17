import { urlForImage } from "@/lib/sanity/utils/image";
import { formatDateFull } from "@/lib/utils";
import { Article as ArticleType } from "@/lib/zod/article";
import Image from "next/image";
import BlockContent from "./block-content";
import { TypographyH1, TypographySmall } from "./typography";
import { PreviousPageButton } from "./ui/previous-page-button";

export default function Article({ article }: { article: ArticleType }) {
  const date = formatDateFull(article._createdAt);

  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="grid gap-6">
        <div>
          <PreviousPageButton variant="outline" />
        </div>
        <Image
          src={urlForImage(article.image)}
          alt={article.image.alt}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
          priority
        />
        <TypographyH1>{article.title}</TypographyH1>
        <TypographySmall>{date}</TypographySmall>
        <BlockContent content={article.body} />
      </div>
    </article>
  );
}
