import { Cta } from "@/lib/zod/section";
import SanityLink from "../sanity-link";
import { TypographyH1, TypographyParagraph } from "../typography";
import { Button } from "../ui/button";

export default function CtaSection({ content }: { content: Cta }) {
  return (
    <section className="w-full">
      <div className="flex w-full max-w-4xl flex-col gap-4">
        <TypographyH1>{content.title}</TypographyH1>
        <TypographyParagraph>{content.description}</TypographyParagraph>
        <div className="flex items-center space-x-4">
          {content.primaryLink && (
            <SanityLink href={content.primaryLink}>
              <Button>{content.primaryLink.label}</Button>
            </SanityLink>
          )}
          {content.secondaryLink && (
            <SanityLink href={content.secondaryLink}>
              <Button variant="secondary">{content.secondaryLink.label}</Button>
            </SanityLink>
          )}
        </div>
      </div>
    </section>
  );
}
