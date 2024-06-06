import { getMenu2 } from "../client";

export async function getMenus(locale: string) {
  const [main, footer] = await Promise.all(
    ["main-menu", "footer-menu"].map((menu) => getMenu2(menu, locale)),
  );

  return {
    main,
    footer,
  };
}
