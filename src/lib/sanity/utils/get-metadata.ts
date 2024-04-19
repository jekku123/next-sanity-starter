import { getMetadataBySlug, getSettings } from "@/lib/sanity/client";
import { Metadata } from "next";

export async function getDynamicMetadata(path: string): Promise<Metadata> {
  const [metadata, settings] = await Promise.all([
    getMetadataBySlug(path),
    getSettings(),
  ]);

  return {
    title: `${metadata?.title} | ${settings?.title.text}`,
    description: metadata?.description || settings?.description,
  };
}
