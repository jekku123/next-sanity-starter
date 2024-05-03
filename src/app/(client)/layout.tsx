import Footer from "@/components/footer";
import Header from "@/components/header";
import { getCommonPageProps } from "@/lib/sanity/utils/get-common-page-props";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/lib/next-auth/auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getCommonPageProps();
  return {
    title: settings.title.text,
    description: settings.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { menus, settings } = await getCommonPageProps();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header
                menu={menus.main}
                title={settings.title}
                logo={settings.logo}
              />
              <main className="mx-auto w-full max-w-7xl grow px-6 py-4">
                {children}
              </main>
              <Footer menu={menus.footer} />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
