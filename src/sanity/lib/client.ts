import { createClient } from "next-sanity";

import { Page, validateAndCleanupPage } from "@/lib/zod/page";
import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const query = `*[_type == "page" && slug.current == "${slug}"][0]
  {
    _id,
    _type,
    slug,
    title,
    content[]
  }`;

  const page = await client.fetch(query);
  const validatedPage = validateAndCleanupPage(page);

  return validatedPage;
}
