import Footer from "@/components/footer";
import Header from "@/components/header";
import { getCommonPageProps } from "@/lib/sanity/utils/get-common-page-props";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getCommonPageProps();
  return {
    title: settings.title,
    description: settings.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { menus, settings } = await getCommonPageProps();

  console.log("RootLayout Menus", menus);
  console.log("RootLayout Settings", settings);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header menu={menus.main} title={settings.title} />
          <main className="grow">{children}</main>
          <Footer menu={menus.footer} />
        </div>
      </body>
    </html>
  );
}
