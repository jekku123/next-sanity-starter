import { z } from "zod";
import { ImageSchema } from "./image";
import { PortableTextSchema } from "./portableText";
import { LinkSchema } from "./link";

export const HeroSchema = z.object({
  _type: z.literal("hero"),
  _key: z.string(),
  title: z.string(),
  subtitle: z.string(),
  body: PortableTextSchema,
  image: ImageSchema,
  cta: z.array(LinkSchema),
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
