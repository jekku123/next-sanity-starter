import Section from "@/components/section";
import { getFrontPage } from "@/sanity/lib/client";

export default async function Home() {
  const frontpage = await getFrontPage();

  if (!frontpage) {
    return <div>Frontpage not found</div>;
  }

  return (
    <div className="grid gap-4">
      {frontpage.content.map((section) => (
        <Section key={section._key} section={section} />
      ))}
    </div>
  );
}
