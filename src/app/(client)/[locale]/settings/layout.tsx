import { TypographyH2 } from "@/components/typography";
import { unstable_setRequestLocale } from "next-intl/server";
import Sidebar from "./_components/sidebar";

export default async function DashboardLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <TypographyH2>Settings</TypographyH2>
      <div className="mt-4 flex grow">
        <div className="w-1/4 border-r">
          <Sidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
