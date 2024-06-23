import Article from "@/components/documents/article";
import Page from "@/components/documents/page";
import { Locale } from "@/i18n";
import {
  getResourceByTypeAndParams,
  getResourceTypeBySlug,
} from "@/lib/sanity/client";
import { getDynamicMetadata } from "@/lib/sanity/utils/get-dynamic-metadata";

import { getStaticParams } from "@/lib/sanity/utils/get-static-params";

import { validateAndCleanupArticle } from "@/lib/zod/article";
import { validateAndCleanupPage } from "@/lib/zod/page";
import { Metadata, ResolvingMetadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// Add the types of the resources you want to generate static pages for
const RESOURCE_TYPES = ["page", "article"];

export async function generateStaticParams({ params }: PageParams) {
  const staticParams = await getStaticParams(RESOURCE_TYPES, params.locale);
  return staticParams.map((param) => ({ slug: param }));
}

export async function generateMetadata(
  { params }: PageParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const metadata = await getDynamicMetadata(params, parent);
  return metadata;
}

type PageParams = {
  params: { slug: string[]; locale: Locale };
};

export const revalidate = 60;

export default async function CustomPage({ params }: PageParams) {
  // join the slug array to a string with slashes (e.g. ["articles", "article-1"] => "articles/article-1")
  const slug = params.slug.join("/");
  const locale = params.locale;

  unstable_setRequestLocale(locale);

  // get the type of the resource with the given slug (e.g. "about-us" => "page", "articles/article-1" => "article")
  const type = await getResourceTypeBySlug(slug);

  // if the type is not found then there is no resource with the given slug and we return a 404
  if (!type) {
    return notFound();
  }

  // get the resource with the given slug, locale and groq projections
  const resource = await getResourceByTypeAndParams(type, {
    slug,
    locale,
  });

  // validate and cleanup the resource based on the type
  const validatedResource =
    type === "page"
      ? validateAndCleanupPage(resource)
      : type === "article"
        ? validateAndCleanupArticle(resource)
        : null;

  // if the resource is not found then we return a 404
  if (!validatedResource) {
    return null;
  }

  return (
    <>
      {validatedResource._type === "page" && <Page page={validatedResource} />}
      {validatedResource._type === "article" && (
        <Article article={validatedResource} />
      )}
    </>
  );
}
