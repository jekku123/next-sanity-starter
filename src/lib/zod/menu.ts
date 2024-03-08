import { z } from "zod";

export const MenuItemSchema = z.object({
  _key: z.string(),
  label: z.string(),
  internal: z.string().optional().nullable(),
  external: z.string().optional().nullable(),
});

export const MenuSchema = z.object({
  _id: z.string(),
  title: z.string(),
  items: z.array(MenuItemSchema),
});

export function validateAndCleanupMenu(resource: any): Menu | null {
  try {
    return MenuSchema.parse(resource);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error as {
      name?: string;
      issues?: any[];
    };
    console.log(JSON.stringify({ name, issues, resource }, null, 2));
    return null;
  }
}

export type Menu = z.infer<typeof MenuSchema>;
export type MenuItem = z.infer<typeof MenuItemSchema>;
