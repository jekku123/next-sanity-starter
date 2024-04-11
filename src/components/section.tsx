import { Section as SectionType } from "@/lib/zod/section";
import FormattedTextSection from "./sections/formatted-text";
import HeroSection from "./sections/hero-section";
import TextImageSection from "./sections/text-image-section";

export default function Section({ section }: { section: SectionType }) {
  if (!section) {
    return null;
  }

  switch (section._type) {
    case "hero":
      return <HeroSection content={section} />;
    case "textImage":
      return <TextImageSection content={section} />;
    case "formattedText":
      return <FormattedTextSection content={section} />;
    default:
  }
}
