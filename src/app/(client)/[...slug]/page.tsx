import Article from "@/components/article";
import Page from "@/components/page";
import {
  getResourceBySlugTypeAndParams,
  getResourceTypeBySlug,
} from "@/lib/sanity/client";
import getPageParams from "@/lib/sanity/utils/get-page-params";
import { validateAndCleanupArticle } from "@/lib/zod/article";
import { validateAndCleanupPage } from "@/lib/zod/page";
import { notFound, redirect } from "next/navigation";

export default async function CustomPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  if (slug[0] === "frontpage") {
    redirect("/");
  }

  // get the type of the resource with the given slug (e.g. "page" or "post")
  const type = await getResourceTypeBySlug(slug[0]);

  if (!type) notFound();

  const resource = await getResourceBySlugTypeAndParams(
    slug[0],
    type,
    getPageParams(type),
  );

  const validatedResource =
    type === "page"
      ? validateAndCleanupPage(resource)
      : type === "article"
        ? validateAndCleanupArticle(resource)
        : null;

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
