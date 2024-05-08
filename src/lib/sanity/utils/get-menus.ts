import { getMenu } from "../client";

export async function getMenus() {
  const [main, footer] = await Promise.all(
    ["main-menu", "footer-menu"].map((menu) => getMenu(menu)),
  );

  return {
    main,
    footer,
  };
}
