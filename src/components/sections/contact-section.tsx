import { ContactSection as ContactSectionType } from "@/lib/zod/section";
import { ContactForm } from "../contact-form";

export default function ContactSection({
  content,
}: {
  content: ContactSectionType;
}) {
  return <ContactForm content={content} />;
}
