import { urlForImage } from "@/lib/sanity/utils/image";
import { MenuItem } from "@/lib/zod/menu";
import { Settings } from "@/lib/zod/settings";
import Image from "next/image";
import Link from "next/link";
import SanityLink from "./ui/sanity-link";

export default async function Header({
  menu,
  title,
  logo,
}: {
  menu: MenuItem[];
  title: Settings["title"];
  logo: Settings["logo"];
}) {
  return (
    <header className="top-0 z-50 w-full flex-shrink-0 bg-background md:sticky">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-6">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-bold"
        >
          <Image
            src={urlForImage(logo.asset)}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          {title?.showInHeader && <span>{title.text}</span>}
        </Link>

        <ul className="flex items-center space-x-4">
          {menu?.map((item: MenuItem) => (
            <li key={item._key}>
              <SanityLink link={item}>{item.label}</SanityLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
