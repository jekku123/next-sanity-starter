import { z } from "zod";
import { BlockSchema } from "./block";
import { ImageSchema } from "./image";
import { LinkSchema } from "./link";

export const HeroSchema = z.object({
  _type: z.literal("hero"),
  _key: z.string(),
  title: z.string(),
  subtitle: z.string(),
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

export type TextImage = z.infer<typeof TextImageSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type FormattedText = z.infer<typeof FormattedTextSchema>;
export type ArticlesListing = z.infer<typeof ArticlesListingSchema>;

// export common type for all sections
export type Section = Hero | TextImage | FormattedText | ArticlesListing;
