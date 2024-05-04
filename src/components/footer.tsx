import { MenuItem } from "@/lib/zod/menu";
import { FooterLink } from "./sanity-link";
import { TypographySmall } from "./typography";

export default function Footer({ menu }: { menu: MenuItem[] }) {
  return (
    <footer className="z-50 w-full ">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 text-center">
        <TypographySmall>
          Next.js Sanity Pagebuilder | Jesse Manninen
        </TypographySmall>
        <nav className="flex items-center space-x-4">
          {menu.map((item) => (
            <FooterLink key={item._key} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}
