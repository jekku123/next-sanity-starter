import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      description: "The title of the site",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      description: "A short description of the site for SEO",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "The logo of the site",
      type: "image",
      validation: (rule) => rule.required(),
    }),
  ],
});
