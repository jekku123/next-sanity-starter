import Section from "@/components/section";
import { getFrontPage } from "@/lib/sanity/client";
import getPageParams from "@/lib/sanity/utils/get-page-params";
import { validateAndCleanupPage } from "@/lib/zod/page";

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
