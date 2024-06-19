import { getSlugsByTypeAndLocale } from "../client";

export async function getStaticParams(pageTypes: string[], locale: string) {
  const slugs = await Promise.all(
    pageTypes.map((type) => getSlugsByTypeAndLocale(type, locale)),
  );

  const staticParams = slugs
    .flat()
    .map((path) => ({ slug: path.slug.current.split("/") }));

  return staticParams;
}
