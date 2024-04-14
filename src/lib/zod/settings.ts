import { z } from "zod";

export const SettingsSchema = z.object({
  title: z.object({
    text: z.string(),
    showInHeader: z.boolean(),
  }),
  description: z.string(),
  logo: z.object({
    asset: z.object({
      _ref: z.string(),
    }),
  }),
});

export type Settings = z.infer<typeof SettingsSchema>;
