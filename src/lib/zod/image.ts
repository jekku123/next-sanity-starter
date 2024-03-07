import { z } from "zod";

export const ImageSchema = z.object({
  alt: z.string(),
  asset: z.object({
    _ref: z.string(),
    _type: z.string(),
  }),
});

export type Image = z.infer<typeof ImageSchema>;
