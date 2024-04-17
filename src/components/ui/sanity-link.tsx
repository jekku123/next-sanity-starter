import { Link as LinkType } from "@/lib/zod/link";
import Link from "next/link";

interface CustomLinkSchema {
  link: LinkType;
  children: React.ReactNode;
  className?: string;
}

export default function SanityLink({
  link,
  children,
  className,
}: CustomLinkSchema) {
  return (
    <>
      {link?.internal ? (
        <Link href={`/${link.internal}`} className={className}>
          {children}
        </Link>
      ) : link?.external ? (
        <a
          href={link.external}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          {children}
        </a>
      ) : link?.nextjsRoute ? (
        <Link href={`${link.nextjsRoute}`} className={className}>
          {children}
        </Link>
      ) : null}
    </>
  );
}
