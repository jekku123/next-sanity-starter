import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";

import { ScrollTop } from "@/components/scroll-top";
import { locales } from "@/i18n";
import { getSettings } from "@/lib/sanity/client";
import { getLayoutProps } from "@/lib/sanity/utils/get-layout-props";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings?.title.text ?? "Untitled",
    description: settings?.description ?? "No description",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  const { menus, settings } = await getLayoutProps(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header
              menu={menus.main}
              title={settings?.title}
              logo={settings?.logo}
            />
            {children}
            <Footer menu={menus.footer} />
          </div>
          <ScrollTop />
        </Providers>
      </body>
    </html>
  );
}
