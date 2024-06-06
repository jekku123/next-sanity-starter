import { getMetadataBySlugAndLang, getSettings } from "@/lib/sanity/client";

export async function getDynamicMetadata(path: string, locale: string) {
  const [metadata, settings] = await Promise.all([
    getMetadataBySlugAndLang(path, locale),
    getSettings(),
  ]);

  return {
    title: `${metadata?.title} | ${settings?.title.text}`,
    description: `${metadata?.description}`,
  };
}
