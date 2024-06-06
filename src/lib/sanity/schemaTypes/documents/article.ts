import { defineField, defineType } from "sanity";
import { isUniqueOtherThanLanguage } from "./page";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: "slug",
    //   type: "slug",
    //   title: "Slug",
    //   options: {
    //     source: (doc) => `articles/${doc.title}`,
    //     isUnique: (value, context) => context.defaultIsUnique(value, context),
    //     slugify: (input) =>
    //       input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
    //   },
    //   validation: (Rule) => Rule.required(),
    // },
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
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          name: "tag",
          type: "string",
          title: "Tag",
        },
      ],
      options: {
        layout: "tags",
      },
    },
  ],
});
