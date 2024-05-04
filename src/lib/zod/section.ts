import { z } from "zod";
import { BlockSchema } from "./block";
import { ImageSchema } from "./image";
import { LinkSchema } from "./link";

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
  body: BlockSchema,
  image: ImageSchema,
  primaryLink: LinkSchema.optional().nullable(),
  secondaryLink: LinkSchema.optional().nullable(),
});

export const TextImageSchema = z.object({
  _type: z.literal("textImage"),
  _key: z.string(),
  title: z.string(),
  body: BlockSchema,
  image: ImageSchema,
});

export const FormattedTextSchema = z.object({
  _type: z.literal("formattedText"),
  _key: z.string(),
  title: z.string(),
  body: z.any(),
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
  subHeading: z.string(),
});

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
  | ContactSection;
