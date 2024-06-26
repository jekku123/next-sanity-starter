import Section from "@/components/sections";
import { Locale } from "@/i18n";
import { getVerificationTokenByToken } from "@/lib/next-auth/data-access/verification-token";
import { getFrontPage } from "@/lib/sanity/client";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const revalidate = 60;

export default async function FrontPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("FrontPage");

  const frontpage = await getFrontPage(locale);

  if (!frontpage) {
    return <div>{t("frontpage-not-found")}</div>;
  }

  const keke = await getVerificationTokenByToken("keke");

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
