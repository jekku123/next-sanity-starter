import { getMenu } from "./client";

export async function getMenus() {
  const [{ items: main }, { items: footer }] = await Promise.all(
    ["main-menu", "footer-menu"].map((menu) => getMenu(menu)),
  );

  return {
    main,
    footer,
  };
}
