import { TypographyH3 } from "@/components/typography";
import { Locale } from "@/i18n";
import { currentUser } from "@/lib/next-auth/utils/auth";
import { unstable_setRequestLocale } from "next-intl/server";
import { ProfileForm } from "./_components/profile-form";

export const revalidate = 60;

export default async function ProfilePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  const user = await currentUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  return (
    <>
      <TypographyH3 className="mb-4">Profile</TypographyH3>
      <ProfileForm user={user} />
    </>
  );
}
