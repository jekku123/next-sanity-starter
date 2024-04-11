import { type SchemaTypeDefinition } from "sanity";

import navigation from "./schemaTypes/documents/navigation";
import page from "./schemaTypes/documents/page";
import hero from "./schemaTypes/objects/hero";
import link from "./schemaTypes/objects/link";
import portableText from "./schemaTypes/objects/formatted-text";
import textImage from "./schemaTypes/objects/text-image";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, hero, textImage, link, navigation, portableText],
};
