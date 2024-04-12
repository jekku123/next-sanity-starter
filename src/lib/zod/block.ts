import { z } from "zod";

export const BlockSchema = z.array(
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
  z.object({
    _key: z.string(),
    _type: z.string(),
    asset: z.object({
      _ref: z.string(),
      _type: z.string(),
    }),
  }),
);

export type Block = z.infer<typeof BlockSchema>;
