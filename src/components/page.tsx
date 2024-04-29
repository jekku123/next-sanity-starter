import { Page as PageType } from "@/lib/zod/page";
import Section from "./sections";

export default function Page({ page }: { page: PageType }) {
  return (
    <div className="grid gap-20">
      {page.content.map((section) => (
        <Section key={section._key} section={section} />
      ))}
    </div>
  );
}
