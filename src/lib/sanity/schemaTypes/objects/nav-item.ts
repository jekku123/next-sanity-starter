import { defineType } from "sanity";

export default defineType({
  name: "navItem",
  type: "object",
  title: "Navigation Item",
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
      hidden: ({ parent, value }) =>
        (!value && !!parent?.internal) || (!value && !!parent?.nextjsRoute),
    },
    {
      name: "internal",
      type: "reference",
      to: [{ type: "page" }, { type: "frontpage" }],
      hidden: ({ parent, value }) =>
        (!value && !!parent?.external) || !!parent?.nextjsRoute,
    },
    {
      name: "nextjsRoute",
      type: "string",
      title: "Next.js Route",
      description:
        "The route to the page in the Next.js app, used for client-side navigation. Example: 'articles",
      hidden: ({ parent, value }) =>
        (!value && !!parent?.external) || !!parent?.internal,
    },
    {
      name: "subItems",
      type: "array",
      title: "Sub Items",
      of: [
        {
          type: "navItem",
        },
      ],
    },
  ],
});
