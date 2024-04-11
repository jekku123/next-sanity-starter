import { MenuItem } from "@/lib/zod/menu";
import Link from "next/link";
import SanityLink from "./sanity-link";

export default async function Header({ menu }: { menu: MenuItem[] }) {
  return (
    <header className="top-0 z-50 w-full flex-shrink-0 bg-background md:sticky">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold">
          Jannes Mökki
        </Link>
        <ul className="flex items-center space-x-4">
          {menu?.map((item: MenuItem) => (
            <li key={item._key}>
              <SanityLink href={item}>{item.label}</SanityLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
