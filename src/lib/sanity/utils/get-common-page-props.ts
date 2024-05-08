import { getMenus } from "@/lib/sanity/utils/get-menus";
import { validateAndCleanupMenu } from "@/lib/zod/menu";
import { getSettings } from "../client";

export async function getCommonPageProps() {
  const [menus, settings] = await Promise.all([getMenus(), getSettings()]);

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
