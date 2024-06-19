import Section from "@/components/sections";
import { getFrontPage } from "@/lib/sanity/client";
import getResourceGroqParams from "@/lib/sanity/utils/get-resource-groq-params";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const revalidate = 60;

export default async function FrontPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("FrontPage");

  const frontpage = await getFrontPage(
    getResourceGroqParams("frontpage"),
    locale,
  );

  if (!frontpage) {
    return <div>{t("frontpage-not-found")}</div>;
  }

  return (
    <>
      <div className="grid gap-20">
        {frontpage.content.map((section) => (
          <Section key={section._key} section={section} />
        ))}
      </div>
    </>
  );
}
