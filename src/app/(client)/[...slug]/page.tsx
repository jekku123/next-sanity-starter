import Page from "@/components/page";
import { getPageBySlug } from "@/sanity/lib/client";
import { redirect } from "next/navigation";

export default async function CustomPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = await getPageBySlug(slug);

  if (!page) {
    return <div>Page not found</div>;
  }

  if (page.title === "Frontpage") {
    redirect("/");
  }

  if (page._type === "page") {
    return <Page page={page} />;
  }
}
