import { Locale } from "@/i18n";
import { getSettings } from "../client";
import { getMenus } from "./get-menus";

export async function getLayoutProps(locale: Locale) {
  const [menus, settings] = await Promise.all([
    getMenus(locale),
    getSettings(),
  ]);

  return {
    menus: {
      main: menus.main?.items || [],
      footer: menus.footer?.items || [],
    },
    settings,
  };
}
