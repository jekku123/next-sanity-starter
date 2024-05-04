import { type SchemaTypeDefinition } from "sanity";

import article from "./schemaTypes/documents/article";
import frontpage from "./schemaTypes/documents/frontpage";
import navigation from "./schemaTypes/documents/navigation";
import page from "./schemaTypes/documents/page";
import settings from "./schemaTypes/documents/settings";
import submissions from "./schemaTypes/documents/submissions";
import link from "./schemaTypes/objects/link";
import navItem from "./schemaTypes/objects/nav-item";
import articlesListing from "./schemaTypes/sections/articles-listing";
import contactForm from "./schemaTypes/sections/contact-form";
import portableText from "./schemaTypes/sections/formatted-text";
import hero from "./schemaTypes/sections/hero";
import textImage from "./schemaTypes/sections/text-image";
import { userSchemaTypes } from "./schemaTypes/user";

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
    articlesListing,
    navItem,
    submissions,
    contactForm,
    ...userSchemaTypes,
  ],
};
