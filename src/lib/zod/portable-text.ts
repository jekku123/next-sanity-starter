// This function takes in a type, and returns a type to Zod

import { z } from "zod";

const PortableTextBaseSchema = z.object({
  _type: z.string(),
  _key: z.string(),
});

export const PortableTextBlockSchema = PortableTextBaseSchema.extend({
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
});

export const PortableTextListSchema = PortableTextBlockSchema.extend({
  level: z.number(),
  listItem: z.string(),
});

export const PortableTextImageSchema = PortableTextBaseSchema.extend({
  alt: z.string(),
  asset: z.object({
    _ref: z.string(),
    _type: z.string(),
  }),
});

export const PortableTextSchema = z.array(
  z.union([
    PortableTextListSchema,
    PortableTextBlockSchema,
    PortableTextImageSchema,
  ]),
);

export type PortableTextImageType = z.infer<typeof PortableTextImageSchema>;
export type PortableTextBlockType = z.infer<typeof PortableTextBlockSchema>;
export type PortableTextListType = z.infer<typeof PortableTextListSchema>;
export type PortableTextType = z.infer<typeof PortableTextSchema>;

export function validateAndCleanupResponse<T extends z.ZodTypeAny>(
  data: unknown,
  schema: T,
) {
  try {
    return schema.parse(data) as z.infer<T>;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { name = "ZodError", issues = [] } = error;
      console.log(JSON.stringify({ name, issues }, null, 2));
    }
    return null;
  }
}
