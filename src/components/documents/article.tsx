import { formatDate, formatDateFull } from "@/lib/utils";
import { Article as ArticleType } from "@/lib/zod/article";
import BlockContent from "../block-content";
import { SanityImage } from "../sanity-image";
import { TypographyMuted, TypographySmall } from "../typography";
import { PreviousPageButton } from "../ui/previous-page-button";

export default function Article({ article }: { article: ArticleType }) {
  const date = formatDateFull(article._createdAt);
  const updated = article._updatedAt ? formatDate(article._updatedAt) : null;

  return (
    <article className="mx-auto w-full max-w-5xl">
      <SanityImage
        image={article.image}
        className="max-h-[440px] w-full rounded-xl object-cover"
      />
      <div className="ml-1">
        <div className="mt-2 flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
          <TypographySmall>
            Published: <span className="underline">{date}</span>
          </TypographySmall>
          {updated && (
            <TypographyMuted>
              Updated: <span className="underline">{updated}</span>
            </TypographyMuted>
          )}
        </div>
        <TypographyMuted className="pt-2 uppercase text-muted-foreground">
          {article.tags.map((tag) => tag).join(" / ")}
        </TypographyMuted>
      </div>

      <BlockContent className="mt-9" content={article.body} />

      <PreviousPageButton className="mt-9" variant="outline" />
    </article>
  );
}
