import { Locale } from "@/i18n";
import { getMenu } from "../client";

export async function getMenus(locale: Locale) {
  const [main, footer] = await Promise.all(
    ["main-menu", "footer-menu"].map((menu) => getMenu(menu, locale)),
  );

  return {
    main,
    footer,
  };
}
