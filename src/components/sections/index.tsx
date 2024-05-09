import { Section as SectionType } from "@/lib/zod/section";
import ArticlesListingSection from "./articles-listing--section";
import ContactSection from "./contact--section";
import CtaSection from "./cta--section";
import FormattedTextSection from "./formatted-text--section";
import HeroSection from "./hero--section";
import TextImageSection from "./text-image--section";

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
    case "articlesListing":
      return <ArticlesListingSection content={section} />;
    case "contactSection":
      return <ContactSection content={section} />;
    case "cta":
      return <CtaSection content={section} />;
    default: {
      console.error(
        `No section component found for ${(section as SectionType)._type}`,
      );
      return null;
    }
  }
}
