import { HomeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { isUniqueOtherThanLanguage } from "./page";

export default defineType({
  name: "frontpage",
  title: "Frontpage",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Short description of the page for SEO purposes.",
      validation: (rule) => rule.required(),
    }),
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
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "hero",
        },
        {
          type: "textImage",
        },
        {
          type: "formattedText",
        },
        {
          type: "articlesListing",
        },
        {
          type: "contactSection",
        },
        {
          type: "cta",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
});
