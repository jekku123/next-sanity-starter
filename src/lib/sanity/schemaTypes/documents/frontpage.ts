import { HomeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

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
      },
      readOnly: true,
      validation: (rule) => rule.required(),
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
  ],
});
