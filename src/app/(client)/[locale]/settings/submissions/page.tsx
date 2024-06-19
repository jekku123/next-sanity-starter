import { currentUser } from "@/lib/next-auth/utils/auth";
import { getSubmissionsByUserId } from "@/lib/sanity/client";
import { unstable_setRequestLocale } from "next-intl/server";
import SubmissionsTable from "./submissions-table";

export const revalidate = 60;

export default async function SubmissionsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const user = await currentUser();

  const submissions = await getSubmissionsByUserId(user?.id!);

  return <SubmissionsTable submissions={submissions} />;
}
