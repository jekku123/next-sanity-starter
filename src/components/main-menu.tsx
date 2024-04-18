"use client";

import { MenuItem } from "@/lib/zod/menu";
import SanityLink from "./ui/sanity-link";

export default function MainMenu({ menu }: { menu: MenuItem[] }) {
  // TODO: Do the active links thingy, need fix frontpage stuff first!
  //   const pathname = usePathname();
  //   const pathOrigin = pathname.split("/")[1];

  return (
    <ul className="flex gap-4">
      {menu?.map((item: MenuItem) => (
        <li key={item._key}>
          <SanityLink link={item}>{item.label}</SanityLink>
        </li>
      ))}
    </ul>
  );
}
