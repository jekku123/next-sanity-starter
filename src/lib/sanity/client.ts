import { createClient } from "next-sanity";

import { env, useCdn } from "@/env";
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

export async function getResourceBySlugTypeAndParams3(
  slug: string,
  type: string,
  params: string,
  language: string,
) {
  try {
    const query = `*[_type == $type && slug.current == $slug && language == $language][0]{
    ${params},
    language,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language
    },
  }`;

    const resource = await client.fetch(query, { slug, type, language });
    console.log("INTERNATIONALIZED RESOURCE: ", resource);
    return resource;
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
    const query = `*[_type == $type && slug.current == $slug][0]${params}`;
    const resource = await client.fetch(query, { slug, type });
    return resource;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getFrontPage(params: string) {
  const query = `*[_type == "frontpage"][0]{${params}}`;
  const resource = await client.fetch(query);
  return resource;
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

export async function getMetadataBySlug(slug: string) {
  const query = `*[slug.current == $slug][0] {
    title,
    description,
  }`;
  const metadata = await client.fetch(query, { slug });
  const validatedMetadata = validateAndCleanupMetadata(metadata);
  return validatedMetadata;
}

export async function getMenu(slug: string) {
  const query = `*[_type == "navigation" && slug.current == $slug][0] 
  {
    _id,
    _type,
    title,
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

  const menu = await client.fetch(query, { slug });

  return menu;
}
