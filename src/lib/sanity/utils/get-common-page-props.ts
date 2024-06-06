import { validateAndCleanupMenu } from "@/lib/zod/menu";
import { getSettings } from "../client";
import { getMenus } from "./get-menus";

export async function getCommonPageProps(locale: string) {
  const [menus, settings] = await Promise.all([
    getMenus(locale),
    getSettings(),
  ]);

  const [main, footer] = [menus.main, menus.footer].map((menu) =>
    validateAndCleanupMenu(menu),
  );

  return {
    menus: {
      main: main?.items ?? [],
      footer: footer?.items ?? [],
    },
    settings,
  };
}
