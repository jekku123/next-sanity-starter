import { deleteTestUser } from "@/lib/auth/actions/delete-test-user";
import { currentUser } from "@/lib/auth/utils/auth";
import { urlForImage } from "@/lib/sanity/utils/image";
import { MenuItem } from "@/lib/zod/menu";
import { Settings } from "@/lib/zod/settings";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./auth/logout-button";
import { SocialLogin } from "./auth/social-login";
import { MainMenu } from "./main-menu";
import { Button } from "./ui/button";
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
        <Link
          href="/"
          className="flex items-center space-x-3 text-2xl font-bold"
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

        <div className="flex items-center space-x-4">
          <MainMenu menu={menu} />
          {user ? (
            <LogoutButton>Logout</LogoutButton>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )}

          <SocialLogin />

          <form action={deleteTestUser}>
            <Button type="submit">Delete Test User</Button>
          </form>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
