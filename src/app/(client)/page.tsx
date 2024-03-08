import Section from "@/components/section";
import { validateAndCleanupPage } from "@/lib/zod/page";
import { getFrontPage } from "@/sanity/lib/client";
import getPageParams from "@/sanity/lib/get-page-params";

export default async function Home() {
  const frontpage = await getFrontPage(getPageParams("frontpage"));
  const validatedFrontpage = validateAndCleanupPage(frontpage);

  if (!validatedFrontpage) {
    return <div>Frontpage not found</div>;
  }

  return (
    <div className="grid gap-4">
      {validatedFrontpage.content.map((section) => (
        <Section key={section._key} section={section} />
      ))}
    </div>
  );
}
