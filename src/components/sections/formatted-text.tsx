import { FormattedText } from "@/lib/zod/section";
import BlockContent from "../block-content";
import { TypographyH1 } from "../typography";

export default function FormattedTextSection({
  content,
}: {
  content: FormattedText;
}) {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH1>{content.title}</TypographyH1>
      <BlockContent className="px-2" content={content.body} />
    </div>
  );
}
