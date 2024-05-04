import { currentUser } from "@/lib/next-auth/utils/auth";
import { urlForImage } from "@/lib/sanity/utils/image";
import { MenuItem } from "@/lib/zod/menu";
import { Settings } from "@/lib/zod/settings";
import Image from "next/image";
import Link from "next/link";
import { UserMenu } from "./auth/user-menu";
import { MainMenu } from "./main-menu";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "./ui/mode-toggle";

export default async function Header({
  menu,
  title,
  logo,
}: {
  menu: MenuItem[];
  title: Settings["title"];
  logo: Settings["logo"];
}) {
  const user = await currentUser();

  return (
    <header className="top-0 z-50 w-full flex-shrink-0 bg-background md:sticky">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-6">
        <MobileMenu menu={menu} className="flex lg:hidden" />
        <SiteTitle title={title} logo={logo} />
        <MainMenu menu={menu} className="hidden lg:flex" />
        <div className="z-50 flex items-center space-x-4">
          {!user ? (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          ) : (
            <UserMenu user={user} />
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

function SiteTitle({
  title,
  logo,
}: {
  title: Settings["title"];
  logo: Settings["logo"];
}) {
  return (
    <Link
      href="/"
      className="z-50 hidden items-center space-x-3 text-2xl font-bold sm:flex"
      data-test-id="header-logo"
    >
      <Image
        src={urlForImage(logo.asset)}
        alt="Logo"
        width={35}
        height={35}
        className="rounded-full object-cover"
      />
      {title?.showInHeader && <span>{title.text}</span>}
    </Link>
  );
}
