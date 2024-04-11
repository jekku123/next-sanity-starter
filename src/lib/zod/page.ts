import { z } from "zod";
import { FormattedTextSchema, HeroSchema, TextImageSchema } from "./section";

const PageElementsSchema = z.discriminatedUnion("_type", [
  HeroSchema,
  TextImageSchema,
  FormattedTextSchema,
]);

const PageSchema = z.object({
  _type: z.literal("page"),
  _id: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  content: z.array(PageElementsSchema),
});

export function validateAndCleanupPage(page: any): Page | null {
  try {
    const topLevelPageData = PageSchema.omit({
      content: true,
    }).parse(page);

    const validatedSections = page.content
      .map((section: any) => {
        const result = PageElementsSchema.safeParse(section);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating page section ${section.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelPageData,
      content: validatedSections,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { name = "ZodError", issues = [] } = error;
      console.log(JSON.stringify({ name, issues, page }, null, 2));
    }
    return null;
  }
}

export type Page = z.infer<typeof PageSchema>;
