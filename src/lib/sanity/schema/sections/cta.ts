import { defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      title: "Description",
      name: "description",
      type: "text",
    },
    {
      name: "primaryLink",
      title: "Primary Link",
      type: "link",
    },
    {
      name: "secondaryLink",
      title: "Secondary Link",
      type: "link",
    },
  ],
});
