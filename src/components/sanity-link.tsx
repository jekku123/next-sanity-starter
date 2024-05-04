import { Link as LinkType } from "@/lib/zod/link";
import Link, { LinkProps } from "next/link";

interface CustomLinkSchema extends Omit<LinkProps, "href"> {
  href: LinkType;
  children: React.ReactNode;
  className?: string;
}

export default function SanityLink({
  href,
  children,
  className,
}: CustomLinkSchema) {
  return (
    <>
      {href?.internal ? (
        <Link href={`/${href.internal}`} className={className}>
          {children}
        </Link>
      ) : href?.external ? (
        <a
          href={href.external}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          {children}
        </a>
      ) : href?.nextjsRoute ? (
        <Link href={`${href.nextjsRoute}`} className={className}>
          {children}
        </Link>
      ) : null}
    </>
  );
}

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <>
      {!href.startsWith("http") ? (
        <Link href={`/${href}`} className={className}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {children}
        </a>
      ) : null}
    </>
  );
}
