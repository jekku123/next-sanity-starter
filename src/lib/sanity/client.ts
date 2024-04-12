import { createClient } from "next-sanity";

import { Menu, validateAndCleanupMenu } from "@/lib/zod/menu";
import { Page } from "@/lib/zod/page";
import { apiVersion, dataset, projectId, useCdn } from "./env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

// return the type of the resource with the given slug (e.g. "page" or "post")
export async function getResourceTypeBySlug(slug: string) {
  if (!slug) {
    return null;
  }
  const query = `*[slug.current == "${slug}"][0] {
    _type
  }`;
  try {
    const resource = await client.fetch(query);
    return resource._type;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getResourceBySlugTypeAndParams(
  slug: string,
  type: string,
  params: string,
) {
  try {
    const query = `*[_type == "${type}" && slug.current == "${slug}"][0]${params}`;
    const resource = await client.fetch(query);
    return resource;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getFrontPage(params: string): Promise<Page | null> {
  const query = `*[_type == "page" && slug.current == "frontpage"][0]
  ${params}`;

  const resource = await client.fetch(query);

  return resource;
}

export async function getMenu(slug: string): Promise<Menu> {
  const query = `*[_type == "navigation" && slug.current == "${slug}"][0] 
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

  if (!validatedMenu) {
    throw new Error(`Menu "${slug}" not found`);
  }

  return validatedMenu;
}
