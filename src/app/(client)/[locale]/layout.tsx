import Footer from "@/components/footer";
import Header from "@/components/header";
import { getCommonPageProps } from "@/lib/sanity/utils/get-common-page-props";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { ScrollTop } from "@/components/scroll-top";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/lib/next-auth/auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getCommonPageProps();
  return {
    title: settings?.title.text ?? "Untitled",
    description: settings?.description ?? "No description",
  };
}

const locales = ["en", "de"];

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

  const { menus, settings } = await getCommonPageProps();
  const session = await auth();
  const messages = await getMessages();

  console.log({ locale, messages });

  return (
    <SessionProvider session={session}>
      <html lang={locale} suppressHydrationWarning>
        <body className={inter.className}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen flex-col">
                <Header
                  menu={menus.main}
                  title={settings?.title}
                  logo={settings?.logo}
                />

                <main className="mx-auto w-full max-w-7xl grow px-6 py-6 md:py-9">
                  {children}
                </main>

                <Footer menu={menus.footer} />
              </div>
              <ScrollTop />
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
