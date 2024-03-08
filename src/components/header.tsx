import { MenuItem } from "@/lib/zod/menu";
import { getMenu } from "@/sanity/lib/client";
import Link from "next/link";

export default async function Header() {
  const menu = await getMenu();

  return (
    <header className="top-0 z-50 w-full flex-shrink-0 md:sticky">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold">
          Jannes Mökki
        </Link>
        <ul className="flex items-center space-x-4">
          {menu?.items.map((item: MenuItem) => (
            <li key={item._key}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
