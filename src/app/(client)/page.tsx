import Section from "@/components/sections";
import { getFrontPage } from "@/lib/sanity/client";
import getPageParams from "@/lib/sanity/utils/get-page-params";
import { validateAndCleanupFrontPage } from "@/lib/zod/frontpage";

export default async function FrontPage() {
  const frontpage = await getFrontPage(getPageParams("frontpage"));
  const validatedFrontpage = validateAndCleanupFrontPage(frontpage);

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
