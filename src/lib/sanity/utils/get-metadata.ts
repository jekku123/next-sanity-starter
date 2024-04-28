import { getMetadataBySlug, getSettings } from "@/lib/sanity/client";

export async function getDynamicMetadata(path: string) {
  const [metadata, settings] = await Promise.all([
    getMetadataBySlug(path),
    getSettings(),
  ]);

  return {
    title: `${metadata?.title} | ${settings?.title.text}`,
    description: `${metadata?.description}`,
  };
}
