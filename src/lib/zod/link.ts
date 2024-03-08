import { z } from "zod";

export const LinkSchema = z.object({
  label: z.string(),
  external: z.string().optional().nullable(),
  internal: z.string().optional().nullable(),
});

export type Link = z.infer<typeof LinkSchema>;
