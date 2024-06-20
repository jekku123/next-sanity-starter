import "server-only";

import {
  FilteredResponseQueryOptions,
  createClient,
  type QueryParams,
} from "next-sanity";

import { env, useCdn } from "@/env";
import { Slug } from "sanity";
import { FrontPage, validateAndCleanupFrontPage } from "../zod/frontpage";
import { Menu, validateAndCleanupMenu } from "../zod/menu";
import { Metadata, validateAndCleanupMetadata } from "../zod/metadata";
import { Settings, validateAndCleanupSettings } from "../zod/settings";
import { ResourceType, getGroqProjections } from "./utils/get-groq-projections";
import {
  getFrontPageQuery,
  getMenuQuery,
  getMetadataQuery,
  getResourceBySlugLocaleAndProjectionsQuery,
  getResourceTypeBySlugQuery,
  getSettingsQuery,
  getSlugsByTypeAndLocaleQuery,
} from "./utils/queries";

export const client = createClient({
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn,
});

export async function sanityFetch<QueryResult>({
  query,
  params = {},
  options,
}: {
  query: string;
  params?: QueryParams;
  options?: FilteredResponseQueryOptions;
}) {
  return client.fetch<QueryResult>(query, params, options);
}

export async function getResourceTypeBySlug(slug: string) {
  const resource = await sanityFetch<{ _type?: ResourceType }>({
    query: getResourceTypeBySlugQuery,
    params: { slug },
  });

  if (!resource._type) {
    return null;
  }

  return resource._type;
}

export async function getSlugsByTypeAndLocale(type: string, language: string) {
  const slugs = await sanityFetch<{ slug: Slug }[]>({
    query: getSlugsByTypeAndLocaleQuery,
    params: { type, language },
  });
  return slugs;
}

export async function getResourceBySlugTypeAndLocale(
  slug: string,
  type: ResourceType,
  language: string,
) {
  const projections = getGroqProjections(type);

  const resource = await sanityFetch<any>({
    query: getResourceBySlugLocaleAndProjectionsQuery(projections),
    params: {
      slug,
      language,
    },
  });

  return resource;
}

export async function getFrontPage(language: string) {
  const projections = getGroqProjections("frontpage");

  const resource = await sanityFetch<FrontPage>({
    query: getFrontPageQuery(projections),
    params: { language },
  });

  const validatedFrontpage = validateAndCleanupFrontPage(resource);
  return validatedFrontpage;
}

export async function getSettings() {
  const settings = await sanityFetch<Settings>({ query: getSettingsQuery });
  const validatedSettings = validateAndCleanupSettings(settings);
  return validatedSettings;
}

export async function getMetadataBySlugAndLocale(
  slug: string,
  language: string,
) {
  const metadata = await sanityFetch<Metadata>({
    query: getMetadataQuery,
    params: { slug, language },
  });

  const validatedMetadata = validateAndCleanupMetadata(metadata);
  return validatedMetadata;
}

export async function getMenu(slug: string, language: string) {
  const menu = await sanityFetch<Menu>({
    query: getMenuQuery,
    params: { slug, language },
  });
  const validatedMenu = validateAndCleanupMenu(menu);
  return validatedMenu;
}
