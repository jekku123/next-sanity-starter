import { SlugValidationContext, defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
        isUnique: (value: string, context: SlugValidationContext) =>
          context.defaultIsUnique(value, context),
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
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
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "isProtected",
      title: "Protected",
      type: "boolean",
      description:
        "If enabled, only authenticated users can view this page. Otherwise, anyone can view it.",
      initialValue: false,
    },
  ],
});
