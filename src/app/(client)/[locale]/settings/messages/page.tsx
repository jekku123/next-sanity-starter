import { unstable_setRequestLocale } from "next-intl/server";

export const revalidate = 60;

export default async function MessagesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <div>MessagesPage</div>;
}
