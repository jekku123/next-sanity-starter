import Article from "@/components/documents/article";
import Page from "@/components/documents/page";
import {
  getResourceBySlugTypeParamsAndLang,
  getResourceTypeBySlug,
  getSlugsByType,
} from "@/lib/sanity/client";
import { getDynamicMetadata } from "@/lib/sanity/utils/get-metadata";
import getResourceGroqParams, {
  ResourceType,
} from "@/lib/sanity/utils/get-resource-groq-params";

import { validateAndCleanupArticle } from "@/lib/zod/article";
import { validateAndCleanupPage } from "@/lib/zod/page";
import { Metadata, ResolvingMetadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// Add the types of the resources you want to generate static pages for
const pageTypes = ["page", "article"];

export async function generateStaticParams() {
  const slugs = await Promise.all(
    pageTypes.map((type) => getSlugsByType(type)),
  );
  const flattedParams = slugs
    .flat()
    .map((path) => path.slug.current.split("/"));

  return flattedParams.map((params) => ({
    slug: params,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string[]; locale: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const path = params.slug.join("/");
  const locale = params.locale;
  const metadata = await getDynamicMetadata(path, locale);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export const revalidate = 60;

export default async function CustomPage({
  params,
}: {
  params: { slug: string[]; locale: string };
}) {
  const locale = params.locale;
  unstable_setRequestLocale(locale);

  // join the slug array to a string with slashes (e.g. ["articles", "article-1"] => "articles/article-1")
  const slug = `${params.slug.join("/")}`;

  // get the type of the resource with the given slug (e.g. "page", "article"..)
  const type: ResourceType = await getResourceTypeBySlug(slug);

  // if the type is not found then there is no resource with the given slug and we return a 404
  if (!type) {
    return notFound();
  }

  // get the resource with the given slug, type and get the params for the query using the getPageParams function
  const resource = await getResourceBySlugTypeParamsAndLang(
    slug,
    type,
    getResourceGroqParams(type),
    locale,
  );

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
