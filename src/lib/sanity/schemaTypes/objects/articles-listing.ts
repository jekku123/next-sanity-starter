import { defineType } from "sanity";

export default defineType({
  name: "articlesListing",
  title: "Articles Listing",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "limit",
      title: "Limit",
      type: "number",
    },
  ],
});
