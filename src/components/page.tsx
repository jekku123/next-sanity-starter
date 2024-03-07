import { Page } from "@/lib/zod/page";
import Section from "./sections/section";

export default function Page({ page }: { page: Page }) {
  return (
    <div className="grid gap-4">
      {page.content.map((section) => {
        return <Section key={section._key} section={section} />;
      })}
    </div>
  );
}
