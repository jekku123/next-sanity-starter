import { Locale } from "@/i18n";
import { getSlugsByTypeAndLocale } from "../client";

export async function getStaticParams(resourceTypes: string[], locale: Locale) {
  const slugs = await Promise.all(
    resourceTypes.map((type) => getSlugsByTypeAndLocale(type, locale)),
  );

  const staticParams = slugs.flat().map((path) => path.slug.current.split("/"));

  return staticParams;
}
