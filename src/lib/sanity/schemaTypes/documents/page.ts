import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
      ],
    },
  ],
});
