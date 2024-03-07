import Link from "next/link";

interface CustomLinkSchema {
  href: any;
  children: React.ReactNode;
  passHref?: any;
}

export default function SanityLink({
  href,
  children,
  ...props
}: CustomLinkSchema) {
  return (
    <>
      {href?.internal ? (
        <Link href={href.internal.slug.current} {...props}>
          {children}
        </Link>
      ) : href?.external ? (
        <a href={href.external} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : null}
    </>
  );
}
