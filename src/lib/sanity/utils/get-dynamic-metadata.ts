import { getMetadataBySlugAndLocale } from "@/lib/sanity/client";
import { Metadata, ResolvingMetadata } from "next";

export async function getDynamicMetadata(
  params: { slug: string[]; locale: string },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const locale = params.locale;
  const slug = params.slug.join("/");

  const [metadata, parentMetadata] = await Promise.all([
    getMetadataBySlugAndLocale(slug, locale),
    parent,
  ]);

  const parentTitle = parentMetadata.title?.absolute;

  return {
    title: `${metadata?.title || "404"} | ${parentTitle}`,
    description: `${metadata?.description}`,
  };
}
