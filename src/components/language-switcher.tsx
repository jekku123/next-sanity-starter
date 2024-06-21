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
        >
          <CountryFlag countryCode={flag} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locale !== "en" ? (
          <Link href={pathname} locale="en">
            <DropdownMenuItem data-test-id="language-switcher-english">
              <CountryFlag countryCode="GB" />
              {t("english")}
            </DropdownMenuItem>
          </Link>
        ) : (
          <Link href={pathname} locale="fi">
            <DropdownMenuItem data-test-id="language-switcher-finnish">
              <CountryFlag countryCode="FI" />
              {t("finnish")}
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
