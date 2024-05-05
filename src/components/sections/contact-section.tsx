import { ContactSection as ContactSectionType } from "@/lib/zod/section";
import BlockContent from "../block-content";
import { ContactForm } from "../contact-form";
import { TypographyH1 } from "../typography";

export default function ContactSection({
  content,
}: {
  content: ContactSectionType;
}) {
  return (
    <div
      className="mt-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2"
      data-test-id="contact-section"
    >
      <div className="flex flex-col gap-4">
        <TypographyH1>{content.heading}</TypographyH1>
        <BlockContent className="px-2" content={content.body} />
      </div>
      <div className="mx-auto w-full max-w-sm self-center md:mx-0 md:justify-self-end">
        <ContactForm />
      </div>
    </div>
  );
}
