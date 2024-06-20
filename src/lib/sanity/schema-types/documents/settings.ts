import { CogIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    {
      name: "title",
      title: "Site Title",
      description:
        "The title of the site, shown in the browser tab and if checked, in the header",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "showInHeader",
          title: "Show in Header",
          type: "boolean",
          description: "Show the title in the header",
        }),
      ],
    },
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
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
