import { type SchemaTypeDefinition } from "sanity";

import article from "./schemaTypes/documents/article";
import frontpage from "./schemaTypes/documents/frontpage";
import navigation from "./schemaTypes/documents/navigation";
import page from "./schemaTypes/documents/page";
import settings from "./schemaTypes/documents/settings";
import portableText from "./schemaTypes/objects/formatted-text";
import hero from "./schemaTypes/objects/hero";
import link from "./schemaTypes/objects/link";
import textImage from "./schemaTypes/objects/text-image";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page,
    hero,
    textImage,
    link,
    navigation,
    portableText,
    frontpage,
    settings,
    article,
  ],
};
