import { createClient } from "next-sanity";

import { Menu, validateAndCleanupMenu } from "@/lib/zod/menu";
import { validateAndCleanupMetadata } from "../zod/metadata";
import { validateAndCleanupSettings } from "../zod/settings";
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

export async function getStaticPathsByType(type: string) {
  const query = `*[_type == "${type}"] {
    slug {
      current
    }
  }`;

  const paths = await client.fetch(query);
  return paths;
}

export async function getMetadataBySlug(slug: string) {
  const query = `*[slug.current == "${slug}"][0] {
    title,
    description,
  }`;

  const resource = await client.fetch(query);

  const validatedResource = validateAndCleanupMetadata(resource);

  if (!validatedResource) {
    throw new Error(`Metadata for "${slug}" not found`);
  }

  return validatedResource;
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

export async function getFrontPage(params: string) {
  const query = `*[_type == "frontpage"][0]
  ${params}`;

  const resource = await client.fetch(query);

  return resource;
}

export async function getArticles({
  limit,
  order,
}: {
  limit?: number;
  order?: "asc" | "desc";
} = {}) {
  const query = `*[_type == "article"]${
    order ? `| order(_createdAt ${order})` : ""
  }${limit ? `[0...${limit}]` : ""} {
    _id,
    _type,
    title,
    excerpt,
    slug,
    image,
    tags,
  }`;

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
      nextjsRoute,
    }
  }`;

  const menu = await client.fetch(query);

  const validatedMenu = validateAndCleanupMenu(menu);

  if (!validatedMenu) {
    throw new Error(`Menu "${slug}" not found`);
  }

  return validatedMenu;
}

export async function getSettings() {
  const query = `*[_type == "settings"][0] {
    _id,
    _type,
    title,
    description,
    logo,
  }`;

  const settings = await client.fetch(query);
  const validatedSettings = validateAndCleanupSettings(settings);

  if (!validatedSettings) {
    throw new Error("Settings not found");
  }

  return validatedSettings;
}
