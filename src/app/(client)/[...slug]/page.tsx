import Page from "@/components/page";
import { validateAndCleanupPage } from "@/lib/zod/page";
import {
  getResourceBySlugTypeAndParams,
  getResourceTypeBySlug,
} from "@/sanity/lib/client";
import getPageParams from "@/sanity/lib/get-page-params";
import { redirect } from "next/navigation";

export default async function CustomPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  if (slug[0] === "frontpage") {
    redirect("/");
  }

  const type = await getResourceTypeBySlug(slug[0]);
  const params = getPageParams(type);

  const resource = await getResourceBySlugTypeAndParams(slug[0], type, params);

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
