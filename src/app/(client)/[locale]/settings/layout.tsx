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
      <div className="mt-2 flex grow flex-col lg:flex-row">
        <div className="w-full border-b pb-2 lg:w-1/4 lg:border-b-0 lg:border-r lg:pb-0">
          <SidebarNav items={sidebarItems} />
        </div>
        <div className="flex-1 px-0 py-4 lg:px-6 lg:py-2">{children}</div>
      </div>
    </>
  );
}
