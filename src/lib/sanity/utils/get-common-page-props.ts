import { getMenus } from "@/lib/sanity/utils/get-menus";

export type CommonPageProps = Awaited<ReturnType<typeof getCommonPageProps>>;

export async function getCommonPageProps() {
  const [menus] = await Promise.all([getMenus()]);

  return {
    menus,
  };
}
