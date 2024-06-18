import { currentUser } from "@/lib/next-auth/utils/auth";
import { unstable_setRequestLocale } from "next-intl/server";
import { ProfileForm } from "./_components/profile-form";

export const revalidate = 60;

export default async function ProfilePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const user = await currentUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  return (
    <>
      <ProfileForm user={user} />
    </>
  );
}