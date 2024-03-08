import { getMenus } from "@/sanity/lib/get-menus";

export type CommonPageProps = Awaited<ReturnType<typeof getCommonPageProps>>;

export async function getCommonPageProps() {
  const [menus] = await Promise.all([getMenus()]);

  return {
    menus,
  };
}
