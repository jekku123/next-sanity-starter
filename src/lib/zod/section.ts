import { z } from "zod";

import { ImageSchema } from "./image";
import { LinkSchema } from "./link";
import { PortableTextSchema } from "./portable-text";

/**
 * Schema for the different types of sections that can be added to a page
 * To add a new section type, create a new schema, export it, and add it to the union
 * Also add it to the PageElementsSchema union in page.ts or wherever it is used
 * @see src/lib/zod/page.ts
 */

export const HeroSchema = z.object({
  _type: z.literal("hero"),
  _key: z.string(),
  title: z.string(),
  body: PortableTextSchema,
  image: ImageSchema,
  primaryLink: LinkSchema.optional().nullable(),
  secondaryLink: LinkSchema.optional().nullable(),
});

export const TextImageSchema = z.object({
  _type: z.literal("textImage"),
  _key: z.string(),
  title: z.string(),
  body: PortableTextSchema,
  image: ImageSchema,
});

export const FormattedTextSchema = z.object({
  _type: z.literal("formattedText"),
  _key: z.string(),
  title: z.string(),
  body: PortableTextSchema,
});

export const ArticlesListingSchema = z.object({
  _type: z.literal("articlesListing"),
  _key: z.string(),
  title: z.string(),
  limit: z.number(),
});

export const ContactSectionSchema = z.object({
  _type: z.literal("contactSection"),
  _key: z.string(),
  heading: z.string(),
  body: PortableTextSchema,
});

export const CtaSchema = z.object({
  _type: z.literal("cta"),
  _key: z.string(),
  title: z.string(),
  description: z.string(),
  primaryLink: LinkSchema.optional().nullable(),
  secondaryLink: LinkSchema.optional().nullable(),
});

export type Cta = z.infer<typeof CtaSchema>;
export type ContactSection = z.infer<typeof ContactSectionSchema>;
export type TextImage = z.infer<typeof TextImageSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type FormattedText = z.infer<typeof FormattedTextSchema>;
export type ArticlesListing = z.infer<typeof ArticlesListingSchema>;

// export common type for all sections
export type Section =
  | Hero
  | TextImage
  | FormattedText
  | ArticlesListing
  | ContactSection
  | Cta;
