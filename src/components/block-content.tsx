import { urlForImage } from "@/lib/sanity/utils/image";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { PortableTextBlock } from "sanity";
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyParagraph,
} from "./typography";

interface BlockContentProps {
  content: PortableTextBlock[];
  className?: string;
}

// This component is used to render PortableText blocks from Sanity.
// documentation: https://github.com/portabletext/react-portabletext

export default async function BlockContent({
  content,
  className,
}: BlockContentProps) {
  const components = {
    block: {
      h1: ({ children }: any) => (
        <TypographyH1 className="mb-6">{children}</TypographyH1>
      ),
      h2: ({ children }: any) => <TypographyH2>{children}</TypographyH2>,
      h3: ({ children }: any) => <TypographyH3>{children}</TypographyH3>,
      h4: ({ children }: any) => <TypographyH4>{children}</TypographyH4>,
      normal: ({ children }: any) => (
        <TypographyParagraph className="[&:not(:first-child)]:mt-4">
          {children}
        </TypographyParagraph>
      ),
      blockquote: ({ children }: any) => (
        <TypographyBlockquote>{children}</TypographyBlockquote>
      ),
    },

    types: {
      image: ({ value, isInline }: { value: any; isInline: boolean }) => {
        // const { width, height } = getImageDimensions(value);

        return (
          <Image
            width={300}
            height={200}
            src={urlForImage(value)}
            alt={value?.alt || ""}
            className={cn(
              "h-[200px] w-auto rounded-xl object-cover",
              isInline ? "inline-block" : "block",
            )}
            priority
          />
        );
      },
    },

    marks: {
      link: ({ value, children }: { value?: any; children: any }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <Link
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noindex nofollow" : ""}
            className="text-primary underline"
          >
            {children}
          </Link>
        );
      },
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
      ),
      number: ({ children }: any) => <ol className="mt-lg">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="ml-4" style={{ listStyleType: "disclosure-closed" }}>
          {children}
        </li>
      ),
    },
  };

  return (
    <div className={className}>
      <PortableText value={content} components={components} />
    </div>
  );
}
