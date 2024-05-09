import { Hero } from "@/lib/zod/section";
import BlockContent from "../block-content";
import { SanityImage } from "../sanity-image";
import SanityLink from "../sanity-link";
import { TypographyH1 } from "../typography";
import { Button } from "../ui/button";

export default function HeroSection({ content }: { content: Hero }) {
  return (
    <div className="grid w-full grid-cols-1 gap-6  md:grid-cols-2">
      <div className="mr-5 flex flex-col justify-center gap-4">
        <TypographyH1>{content.title}</TypographyH1>
        <BlockContent content={content.body} />
        <div className="flex items-center space-x-4">
          {content.primaryLink && (
            <SanityLink href={content.primaryLink}>
              <Button>{content.primaryLink.label}</Button>
            </SanityLink>
          )}
          {content.secondaryLink && (
            <SanityLink href={content.secondaryLink}>
              <Button variant="outline">{content.secondaryLink.label}</Button>
            </SanityLink>
          )}
        </div>
      </div>
      <SanityImage image={content.image} className="rounded-xl" />
    </div>
  );
}
