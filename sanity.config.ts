/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/src/studio/[[...index]]/page.tsx` route
 */

import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { DocumentDefinition, defineConfig } from "sanity";
import { StructureBuilder, structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { i18nSanityLocaleConfig } from "@/i18n";
import frontpage from "@/lib/sanity/schema/documents/frontpage";
import settings from "@/lib/sanity/schema/documents/settings";
import { env } from "./src/env";
import { schema } from "./src/lib/sanity/schema";

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

// Define the singleton document types
const singletonTypes = new Set(["frontpage", "settings"]);

// Define the hidden document types
const hiddenTypes = new Set([
  "session",
  "account",
  "verificationToken",
  "passwordResetToken",
]);

const translatedSchemaTypes = ["page", "frontpage", "navigation", "article"];

const singletonListItems = (
  S: StructureBuilder,
  singletonTypeDefs: DocumentDefinition[],
) => {
  return singletonTypeDefs.map((typeDef) =>
    S.listItem()
      .title(typeDef.title || typeDef.name)
      .id(typeDef.name)
      .child(S.document().schemaType(typeDef.name).documentId(typeDef.name)),
  );
};

const defaultListItems = (S: StructureBuilder) => {
  return S.documentTypeListItems().filter((listItem) => {
    const listItemId = listItem.getId();
    return (
      listItemId &&
      !singletonTypes.has(listItemId) &&
      !hiddenTypes.has(listItemId)
    );
  });
};

export default defineConfig({
  basePath: "/studio",
  title: "My Pagebuilder Studio",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: schema.types,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    documentInternationalization({
      // Required configuration
      supportedLanguages: i18nSanityLocaleConfig,
      schemaTypes: translatedSchemaTypes,
    }),
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton document types
            ...singletonListItems(S, [frontpage, settings]),

            // Regular document types
            S.divider(),
            ...defaultListItems(S),
          ]),
    }),
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
  ],
});
