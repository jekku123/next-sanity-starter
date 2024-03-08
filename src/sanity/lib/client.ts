import { createClient } from "next-sanity";

import { Menu, validateAndCleanupMenu } from "@/lib/zod/menu";
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

export async function getFrontPage(): Promise<Page | null> {
  const query = `*[_type == "page" && title == "Frontpage"][0]
  {
    _id,
    _type,
    slug,
    title,
    content[] {
      ...,
      _type == "hero" => {
        ...,
        cta[] {
          ...,
          "internal": internal->slug.current,
        }
      },
    }
  }`;

  const page = await client.fetch(query);

  console.log(JSON.stringify(page, null, 2));
  const validatedPage = validateAndCleanupPage(page);

  return validatedPage;
}

export async function getMenu(): Promise<Menu | null> {
  const query = `*[_type == "navigation" && slug.current == "main-menu"][0]
  {
    _id,
    _type,
    title,
    items[] {
      _key,
      label,
      external,
      "internal": internal->slug.current,
    }
  }`;

  const menu = await client.fetch(query);
  const validatedMenu = validateAndCleanupMenu(menu);

  return validatedMenu;
}
