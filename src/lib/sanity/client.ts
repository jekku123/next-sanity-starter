import "server-only";

import {
  FilteredResponseQueryOptions,
  createClient,
  type QueryParams,
} from "next-sanity";

import { env, useCdn } from "@/env";
import { Locale } from "@/i18n";

import { Slug } from "sanity";
import { FrontPage, validateAndCleanupFrontPage } from "../zod/frontpage";
import { Menu, validateAndCleanupMenu } from "../zod/menu";
import { Metadata, validateAndCleanupMetadata } from "../zod/metadata";
import { Settings, validateAndCleanupSettings } from "../zod/settings";
import { ResourceType } from "./utils/get-groq-projections";
import {
  getFrontPageQuery,
  getGroqQueryByResourceType,
  getMenuQuery,
  getMetadataQuery,
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

export async function getResourceTypeBySlug(
  slug: string,
): Promise<ResourceType | null> {
  const resource = await sanityFetch<any>({
    query: getResourceTypeBySlugQuery,
    params: { slug },
  });

  if (!resource) {
    return null;
  }

  return resource._type;
}

export async function getSlugsByTypeAndLocale(
  type: string,
  locale: Locale,
): Promise<{ slug: Slug }[]> {
  const slugs = await sanityFetch<{ slug: Slug }[]>({
    query: getSlugsByTypeAndLocaleQuery,
    params: { type, locale },
  });
  return slugs;
}

export type ResourceQueryParams = {
  slug: string;
  locale: Locale;
};

export async function getResourceByTypeAndParams(
  type: ResourceType,
  params: ResourceQueryParams,
) {
  const resource = await sanityFetch<any>({
    query: getGroqQueryByResourceType(type),
    params: {
      ...params,
    },
  });

  return resource;
}

export async function getFrontPage(locale: Locale): Promise<FrontPage | null> {
  const resource = await sanityFetch<FrontPage>({
    query: getFrontPageQuery(),
    params: { locale },
  });

  const validatedFrontpage = validateAndCleanupFrontPage(resource);
  return validatedFrontpage;
}

export async function getSettings(): Promise<Settings | null> {
  const settings = await sanityFetch<Settings>({ query: getSettingsQuery });
  const validatedSettings = validateAndCleanupSettings(settings);
  return validatedSettings;
}

export async function getMetadataBySlugAndLocale(
  slug: string,
  locale: Locale,
): Promise<Metadata | null> {
  const metadata = await sanityFetch<Metadata>({
    query: getMetadataQuery,
    params: { slug, locale },
  });

  const validatedMetadata = validateAndCleanupMetadata(metadata);
  return validatedMetadata;
}

export async function getMenu(
  slug: string,
  locale: Locale,
): Promise<Menu | null> {
  const menu = await sanityFetch<Menu>({
    query: getMenuQuery,
    params: { slug, locale },
  });
  const validatedMenu = validateAndCleanupMenu(menu);
  return validatedMenu;
}
