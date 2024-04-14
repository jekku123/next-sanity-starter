import { SanityDocument } from "next-sanity";
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

export function validateAndCleanupSettings(
  settings: SanityDocument,
): Settings | null {
  try {
    return SettingsSchema.parse(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { name = "ZodError", issues = [] } = error;
      console.log(JSON.stringify({ name, issues, settings }, null, 2));
    }
    return null;
  }
}

export type Settings = z.infer<typeof SettingsSchema>;
