import Section from "@/components/sections";
import { currentUser } from "@/lib/auth/utils/auth";
import { getFrontPage } from "@/lib/sanity/client";
import getPageGroqParams from "@/lib/sanity/get-page-groq-params";

import { validateAndCleanupFrontPage } from "@/lib/zod/frontpage";

export const revalidate = 60;

export default async function FrontPage() {
  const frontpage = await getFrontPage(getPageGroqParams("frontpage"));
  const validatedFrontpage = validateAndCleanupFrontPage(frontpage);
  const user = await currentUser();

  if (!validatedFrontpage) {
    return <div>Frontpage not found</div>;
  }

  return (
    <div className="grid gap-6">
      {validatedFrontpage.content.map((section) => (
        <Section key={section._key} section={section} />
      ))}
    </div>
  );
}
