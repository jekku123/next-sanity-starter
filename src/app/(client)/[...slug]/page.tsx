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
  const path = `${slug.join("/")}`;

  // get the type of the resource with the given slug (e.g. "frontpage", "page", "article"..)
  const type = await getResourceTypeBySlug(path);

  if (!type) {
    return notFound();
  }

  if (type === "frontpage") {
    return redirect("/");
  }

  const resource = await getResourceBySlugTypeAndParams(
    path,
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
