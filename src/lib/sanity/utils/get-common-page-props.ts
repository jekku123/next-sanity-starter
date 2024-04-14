import { getMenus } from "@/lib/sanity/utils/get-menus";
import { getSettings } from "../client";

export async function getCommonPageProps() {
  const [menus, settings] = await Promise.all([getMenus(), getSettings()]);

  if (!menus || !settings) {
    throw new Error("Failed to fetch common page props");
  }

  return {
    menus,
    settings,
  };
}
