import { z } from "zod";

export const LinkSchema = z.object({
  _key: z.string(),
  _type: z.string(),
  label: z.string(),
  external: z.string().optional(),
  internal: z
    .object({
      _type: z.string(),
      _ref: z.string(),
    })
    .optional(),
});

export type Link = z.infer<typeof LinkSchema>;
