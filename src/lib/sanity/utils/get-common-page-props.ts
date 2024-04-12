import { getMenus } from "@/lib/sanity/utils/get-menus";
import { getSettings } from "../client";

export type CommonPageProps = Awaited<ReturnType<typeof getCommonPageProps>>;

export async function getCommonPageProps() {
  const [menus, settings] = await Promise.all([getMenus(), getSettings()]);

  return {
    menus,
    settings,
  };
}
