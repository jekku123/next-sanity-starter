import Footer from "@/components/footer";
import Header from "@/components/header";
import { getCommonPageProps } from "@/lib/sanity/utils/get-common-page-props";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Janne's Mökki",
  description: "Page for Janne's Mökki",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { menus } = await getCommonPageProps();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header menu={menus.main} />
          <main className="grow">{children}</main>
          <Footer menu={menus.footer} />
        </div>
      </body>
    </html>
  );
}
