import Page from "@/components/page";
import {
  getResourceBySlugTypeAndParams,
  getResourceTypeBySlug,
} from "@/lib/sanity/client";
import getPageParams from "@/lib/sanity/utils/get-page-params";
import { validateAndCleanupPage } from "@/lib/zod/page";
import { redirect } from "next/navigation";

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

  const resource = await getResourceBySlugTypeAndParams(
    slug[0],
    type,
    getPageParams(type),
  );

  console.log("RESOURCE: ", JSON.stringify(resource, null, 2));

  const validatedResource =
    type === "page" ? validateAndCleanupPage(resource) : null;

  if (!validatedResource) {
    return null;
  }

  return (
    <>
      {validatedResource._type === "page" && <Page page={validatedResource} />}
    </>
  );
}
