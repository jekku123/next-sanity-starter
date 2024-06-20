import { TypographyH3 } from "@/components/typography";
import { currentUser } from "@/lib/next-auth/utils/auth";
import { getSubmissionsByUserId } from "@/lib/sanity/data-access/submissions";
import { unstable_setRequestLocale } from "next-intl/server";
import SubmissionsTable from "./submissions-table";

export default async function SubmissionsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const user = await currentUser();

  const submissions = await getSubmissionsByUserId(user?.id!);

  return (
    <>
      <TypographyH3 className="mb-4">Submissions</TypographyH3>
      <SubmissionsTable submissions={submissions} />
    </>
  );
}
