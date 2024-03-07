import Page from "@/components/page";
import { getPageBySlug } from "@/sanity/lib/client";

export default async function CustomPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = await getPageBySlug(slug);

  if (!page) {
    return <div>Page not found</div>;
  }

  if (page._type === "page") {
    return <Page page={page} />;
  }
}
