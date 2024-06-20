import { SlugValidationContext, defineField, defineType } from "sanity";

export async function isUniqueOtherThanLanguage(
  slug: string,
  context: SlugValidationContext,
) {
  const { document, getClient } = context;
  if (!document?.language) {
    return true;
  }
  const client = getClient({ apiVersion: "2024-03-05" });
  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: document.language,
    slug,
  };
  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`;
  const result = await client.fetch(query, params);
  return result;
}

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Short description of the page for SEO purposes.",
      validation: (rule) => rule.required(),
    }),
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
        {
          type: "articlesListing",
        },
        {
          type: "contactSection",
        },
        {
          type: "cta",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "isProtected",
      title: "Protected",
      type: "boolean",
      description:
        "If enabled, only authenticated users can view this page. Otherwise, anyone can view it.",
      initialValue: false,
    },
  ],
});
