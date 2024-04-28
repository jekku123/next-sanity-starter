import { ContactForm } from "@/components/contact-form";
import Section from "@/components/sections";
import { getFrontPage } from "@/lib/sanity/client";
import getResourceGroqParams from "@/lib/sanity/get-resource-groq-params";

import { validateAndCleanupFrontPage } from "@/lib/zod/frontpage";

export const revalidate = 60;

export default async function FrontPage() {
  const frontpage = await getFrontPage(getResourceGroqParams("frontpage"));
  const validatedFrontpage = validateAndCleanupFrontPage(frontpage);

  if (!validatedFrontpage) {
    return <div>Frontpage not found</div>;
  }

  return (
    <div className="grid gap-6">
      {validatedFrontpage.content.map((section) => (
        <Section key={section._key} section={section} />
      ))}
      <ContactForm />
    </div>
  );
}
