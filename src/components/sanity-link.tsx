import { Link as LinkType } from "@/lib/zod/link";
import Link from "next/link";

interface CustomLinkSchema {
  link: LinkType;
  children: React.ReactNode;
  passHref?: any;
}

export default function SanityLink({
  link,
  children,
  ...props
}: CustomLinkSchema) {
  return (
    <>
      {link?.internal ? (
        <Link href={`/${link.internal}`} {...props}>
          {children}
        </Link>
      ) : link?.external ? (
        <a href={link.external} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : link?.nextjsRoute ? (
        <Link href={`${link.nextjsRoute}`} {...props}>
          {children}
        </Link>
      ) : null}
    </>
  );
}
