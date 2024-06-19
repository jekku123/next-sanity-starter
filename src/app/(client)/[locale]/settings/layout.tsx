import { TypographyH2 } from "@/components/typography";
import { unstable_setRequestLocale } from "next-intl/server";
import SidebarNav from "./_components/sidebar";

const sidebarItems = [
  { id: 1, href: "/settings", title: "Profile" },
  { id: 2, href: "/settings/submissions", title: "Submissions" },
];

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
      <div className="mt-2 flex grow">
        <div className="w-1/4 border-r">
          <SidebarNav items={sidebarItems} />
        </div>
        <div className="flex-1 px-6 py-2">{children}</div>
      </div>
    </>
  );
}
