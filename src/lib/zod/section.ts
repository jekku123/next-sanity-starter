import { z } from "zod";
import { ImageSchema } from "./image";
import { LinkSchema } from "./link";
import { PortableTextSchema } from "./portableText";

export const HeroSchema = z.object({
  _type: z.literal("hero"),
  _key: z.string(),
  title: z.string(),
  subtitle: z.string(),
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

export type TextImage = z.infer<typeof TextImageSchema>;
export type Hero = z.infer<typeof HeroSchema>;

export type Section = Hero | TextImage;
