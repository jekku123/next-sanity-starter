import { TextImage } from "@/lib/zod/section";
import BlockContent from "../block-content";
import { SanityImage } from "../sanity-image";
import { TypographyH1 } from "../typography";

export default function TextImageSection({ content }: { content: TextImage }) {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH1>{content.title}</TypographyH1>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-4">
          <BlockContent content={content.body} />
        </div>
        <SanityImage className="rounded-xl" image={content.image} />
      </div>
    </div>
  );
}
