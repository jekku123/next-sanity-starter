import { Section as SectionType } from "@/lib/zod/section";
import FormattedTextSection from "./formatted-text";
import HeroSection from "./hero-section";
import TextImageSection from "./text-image-section";
import ArticlesListingSection from "./articles-listing";

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
    default:
  }
}
