import Article from "@/components/article";
import Page from "@/components/page";
import {
  getResourceBySlugTypeAndParams,
  getResourceTypeBySlug,
  getStaticPathsByType,
} from "@/lib/sanity/client";
import getPageParams from "@/lib/sanity/utils/get-page-params";
import { getDynamicMetadata } from "@/lib/sanity/utils/getMetadata";
import { validateAndCleanupArticle } from "@/lib/zod/article";
import { validateAndCleanupPage } from "@/lib/zod/page";
import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";

// Add the types of the resources you want to generate static pages for
const pageTypes = ["page", "article"];

export async function generateStaticParams() {
  const paths = await Promise.all(
    pageTypes.map((type) => getStaticPathsByType(type)),
  );

  const flattedPaths = paths
    .flat()
    .map((path: any) => path.slug.current.split("/"));

  return flattedPaths.map((page: any) => ({
    slug: page,
  }));
}

// TODO: Add metadata to schemas etc and do this again
export async function generateMetadata(
  { params }: { params: { slug: string[] } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const path = `${params.slug.join("/")}`;
  const metadata = await getDynamicMetadata(path);
  return {
    ...metadata,
  };
}

export default async function CustomPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  // join the slug array to a string with slashes (e.g. ["articles", "article-1"] => "articles/article-1")
  const path = `${slug.join("/")}`;

  // get the type of the resource with the given slug (e.g. "frontpage", "page", "article"..)
  const type = await getResourceTypeBySlug(path);

  // if the type is not found then there is no resource with the given slug and we return a 404
  if (!type) {
    return notFound();
  }

  // if the type is "frontpage" then we redirect to the frontpage
  if (type === "frontpage") {
    return redirect("/");
  }

  // get the resource with the given path, type and get the params for the query using the getPageParams function
  const resource = await getResourceBySlugTypeAndParams(
    path,
    type,
    getPageParams(type),
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
