import { defineType } from "sanity";

export default defineType({
  name: "formattedText",
  title: "Formatted Text",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
          of: [
            {
              type: "image",
              title: "Inline Image",
              options: {
                hotspot: true,
                metadata: [
                  "blurhash", // Default: included
                  "lqip", // Default: included
                  "palette", // Default: included
                ],
              },
            },
          ],
        },
        {
          type: "image",
          options: {
            hotspot: true,
            metadata: [
              "blurhash", // Default: included
              "lqip", // Default: included
              "palette", // Default: included
            ],
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        },
      ],
    },
  ],
});
