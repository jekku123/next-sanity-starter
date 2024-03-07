import { type SchemaTypeDefinition } from "sanity";

import page from "./schemaTypes/documents/page";
import hero from "./schemaTypes/objects/hero";
import link from "./schemaTypes/objects/link";
import textImage from "./schemaTypes/objects/text-image";
import navigation from "./schemaTypes/documents/navigation";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, hero, textImage, link, navigation],
};
