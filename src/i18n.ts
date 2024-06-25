import { SupportedLanguages } from "@sanity/document-internationalization";
import createIntlMiddleware from "next-intl/middleware";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import MiddlewareConfig from "node_modules/next-intl/dist/types/src/middleware/NextIntlMiddlewareConfig";

export type Locale = "en" | "fi";
export const locales = ["en", "fi"] satisfies Locale[];

export const i18nMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
} satisfies MiddlewareConfig<Locale[]>);

export const i18nSanityLocaleConfig = [
  { id: "en", title: "English" },
  { id: "fi", title: "Finnish" },
] satisfies SupportedLanguages;

interface LanguageLink {
  title: string;
  locale: Locale;
  countryCode: string;
}
export const i18nLanguageLinks = [
  {
    title: "english",
    locale: "en",
    countryCode: "GB",
  },
  {
    title: "finnish",
    locale: "fi",
    countryCode: "FI",
  },
] satisfies LanguageLink[];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
