import { defineType } from "sanity";

export default defineType({
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    {
      name: "label",
      type: "string",
      title: "Label",
    },
    {
      name: "external",
      type: "url",
      title: "URL",
      hidden: ({ parent, value }) => !value && !!parent?.internal,
    },
    {
      name: "internal",
      type: "reference",
      to: [{ type: "page" }, { type: "frontpage" }],
      hidden: ({ parent, value }) => !value && !!parent?.external,
    },
    {
      name: "nextjsRoute",
      type: "string",
      title: "Next.js Route",
    },
    {
      name: "internal2",
      type: "object",
      title: "Internal Test",
      fields: [
        {
          name: "sanityRoute",
          type: "reference",
          to: [{ type: "page" }, { type: "frontpage" }],
        },
        {
          name: "nextjsRoute",
          type: "string",
          title: "Next.js Route",
        },
      ],
    },
  ],
});
