import { MenuItem } from "@/lib/zod/menu";
import { SocialIcon } from "react-social-icons";

export default function SocialLinks({
  socialLinks,
}: {
  socialLinks?: MenuItem[];
}) {
  if (!socialLinks) return null;

  return (
    <ul className="flex gap-3">
      {socialLinks.map((item) => (
        <li key={item._key}>
          <SocialIcon
            fgColor="currentColor"
            bgColor="transparent"
            url={item.href}
            target="_blank"
            className="rounded-full text-muted-foreground transition-colors duration-300 hover:bg-accent"
          />
        </li>
      ))}
    </ul>
  );
}
