"use client";

import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/navigation";

import { i18nLanguageLinks } from "@/i18n";
import { CountryFlag } from "./ui/country-flag";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const pathname = usePathname();
  const locale = useLocale();

  const flag = locale === "en" ? "GB" : "fi" && "FI";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          data-test-id="language-switcher-toggle"
          className="z-50"
          aria-label="Language switcher"
        >
          <CountryFlag countryCode={flag} />
          <span className="sr-only">{t("language-switcher")}</span>
        </Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent align="end">
        {i18nLanguageLinks
          .filter((link) => link.locale !== locale)
          .map(({ title, locale, countryCode }) => (
            <Link key={locale} href={pathname} locale={locale}>
              <DropdownMenuItem>
                <CountryFlag countryCode={countryCode} />
                {t(title)}
              </DropdownMenuItem>
            </Link>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
