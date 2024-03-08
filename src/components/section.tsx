import { Section } from "@/lib/zod/section";
import HeroSection from "./sections/hero-section";
import TextImageSection from "./sections/text-image-section";

export default function Section({ section }: { section: Section }) {
  if (!section) {
    return null;
  }

  switch (section._type) {
    case "hero":
      return <HeroSection content={section} />;
    case "textImage":
      return <TextImageSection content={section} />;
    default:
      return null;
  }
}
