import { z } from "zod";

export const PortableTextSchema = z.array(
  z.object({
    _key: z.string(),
    _type: z.string(),
    children: z.array(
      z.object({
        _key: z.string(),
        _type: z.string(),
        marks: z.array(z.string()),
        text: z.string(),
      }),
    ),
    markDefs: z.array(
      z.object({
        _key: z.string(),
        _type: z.string(),
        href: z.string(),
      }),
    ),
    style: z.string(),
  }),
);

export type PortableText = z.infer<typeof PortableTextSchema>;
