import { urlForImage } from "@/lib/sanity/utils/image";
import { Article as ArticleType } from "@/lib/zod/article";
import Image from "next/image";
import BlockContent from "./block-content";
import { TypographyH1, TypographyParagraph } from "./typography";
import { PreviousPageButton } from "./ui/previous-page-button";

export default function Article({ article }: { article: ArticleType }) {
  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col">
      <div>
        <PreviousPageButton />
      </div>
      <Image
        src={urlForImage(article.image)}
        alt={article.image.alt}
        width={"400"}
        height={"300"}
        priority
      />
      <TypographyH1>{article.title}</TypographyH1>
      <TypographyParagraph>{article.excerpt}</TypographyParagraph>
      <BlockContent content={article.body} />
    </article>
  );
}
