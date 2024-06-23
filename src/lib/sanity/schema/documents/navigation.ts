import { NavigationIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { isUniqueOtherThanLanguage } from "./page";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: NavigationIcon,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        // isUnique: (value: string, context: SlugValidationContext) =>
        //   context.defaultIsUnique(value, context),
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
        isUnique: isUniqueOtherThanLanguage,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    {
      name: "items",
      type: "array",
      title: "Navigation items",
      of: [{ type: "navItem" }],
    },
  ],
});
