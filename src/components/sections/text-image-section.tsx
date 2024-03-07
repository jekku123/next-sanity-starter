import { TextImage } from "@/lib/zod/section";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import FormattedText from "../formatted-text";
import { TypographyH1 } from "../typography";

export default function TextImageSection({ content }: { content: TextImage }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <TypographyH1>{content.title}</TypographyH1>
          <FormattedText content={content.body} />
        </div>
        <Image
          src={urlForImage(content.image)}
          alt={content.image.alt}
          width={500}
          height={400}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
