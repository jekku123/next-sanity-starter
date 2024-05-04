import { defineType } from "sanity";

export default defineType({
  name: "contactSection",
  title: "Contact form section",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "subHeading",
      title: "Subheading",
      type: "string",
    },
  ],
});
