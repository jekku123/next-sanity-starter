import "server-only";

import { createClient } from "next-sanity";

import { env, useCdn } from "@/env";
import { Slug } from "sanity";
import { validateAndCleanupFrontPage } from "../zod/frontpage";
import { validateAndCleanupMenu } from "../zod/menu";
import { validateAndCleanupMetadata } from "../zod/metadata";
import { validateAndCleanupSettings } from "../zod/settings";

export const client = createClient({
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn,
});

// return the type of the resource with the given slug (e.g. "page" or "article")
export async function getResourceTypeBySlug(slug: string) {
  const query = `*[slug.current == $slug][0] {
    _type
  }`;
  try {
    const resource = await client.fetch(query, { slug });
    return resource._type;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getSlugsByType(type: string) {
  const query = `*[_type == $type] {
    slug {
      current
    }
  }`;
  const params = await client.fetch(query, { type });
  return params;
}

export async function getSlugsByTypeAndLocale(
  type: string,
  language: string,
): Promise<{ slug: Slug }[]> {
  const query = `*[_type == $type && language == $language] {
    slug {
      current
    }
  }`;
  const slugs = await client.fetch(query, { type, language });
  return slugs;
}

export async function getResourceBySlugParamsAndLocale(
  slug: string,
  params: string,
  language: string,
) {
  try {
    const query = `*[slug.current == $slug && language == $language][0] {
    ${params},
    language,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language
    },
  }`;

    const resource = await client.fetch(query, { slug, language });
    return resource;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getFrontPage(params: string, language: string) {
  const query = `*[_type == "frontpage" && language == $language][0] {
    ${params},
    language,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language
    },
  }`;
  const resource = await client.fetch(query, { language });
  const validatedFrontpage = validateAndCleanupFrontPage(resource);

  return validatedFrontpage;
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

  return validatedSettings;
}

export async function getMetadataBySlugAndLang(slug: string, language: string) {
  const query = `*[slug.current == $slug && language == $language][0] {
    title,
    description,
  }`;
  const metadata = await client.fetch(query, { slug, language });
  const validatedMetadata = validateAndCleanupMetadata(metadata);
  return validatedMetadata;
}

export async function getMenu(slug: string, language: string) {
  const query = `*[_type == "navigation" && slug.current == $slug && language == $language][0] 
  {
    _id,
    _type,
    title,
    language,
    items[] {
      _key,
      label,
      "href": coalesce(external, internal->slug.current, nextjsRoute),
      isProtected,
      subItems[] {
        _key,
        label,
        "href": coalesce(external, internal->slug.current, nextjsRoute),
      }
    }
  }`;

  const menu = await client.fetch(query, { slug, language });
  const validatedMenu = validateAndCleanupMenu(menu);

  return validatedMenu;
}
