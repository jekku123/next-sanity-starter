import Link from "next/link";

export default function Header() {
  return (
    <header className="top-0 z-50 w-full flex-shrink-0 md:sticky">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold">
          Jannes Mökki
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/" className="">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
