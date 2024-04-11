import { FormattedText } from "@/lib/zod/section";
import BlockContent from "../block-content";
import { TypographyH1 } from "../typography";

export default function FormattedTextSection({
  content,
}: {
  content: FormattedText;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <TypographyH1>{content.title}</TypographyH1>
          <BlockContent content={content.body} />
        </div>
      </div>
    </div>
  );
}
