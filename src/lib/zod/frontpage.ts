import { z } from "zod";
import {
  ArticlesListingSchema,
  FormattedTextSchema,
  HeroSchema,
  TextImageSchema,
} from "./section";

const FrontPageElementsSchema = z.discriminatedUnion("_type", [
  HeroSchema,
  TextImageSchema,
  FormattedTextSchema,
  ArticlesListingSchema,
]);

const FrontPageSchema = z.object({
  _type: z.literal("frontpage"),
  _id: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  content: z.array(FrontPageElementsSchema),
});

export function validateAndCleanupFrontPage(page: any): FrontPage | null {
  try {
    const topLevelFrontPageData = FrontPageSchema.omit({
      content: true,
    }).parse(page);

    const validatedSections = page.content
      .map((section: any) => {
        const result = FrontPageElementsSchema.safeParse(section);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating frontpage section ${section._type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelFrontPageData,
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

export type FrontPage = z.infer<typeof FrontPageSchema>;
