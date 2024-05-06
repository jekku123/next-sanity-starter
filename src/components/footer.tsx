import { MenuItem } from "@/lib/zod/menu";
import SocialLinks from "./social-links";
import { TypographyMuted } from "./typography";

export default function Footer({ menu }: { menu: MenuItem[] }) {
  return (
    <footer className="z-50 w-full ">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-6 py-4 md:flex-row md:items-center">
        <TypographyMuted className="hidden sm:flex">
          Next.js Sanity Pagebuilder by Jesse Manninen
        </TypographyMuted>
        <SocialLinks socialLinks={menu} />
      </div>
    </footer>
  );
}
