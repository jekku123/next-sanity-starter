import { type SchemaTypeDefinition } from "sanity";

import article from "./schema-types/documents/article";
import frontpage from "./schema-types/documents/frontpage";
import navigation from "./schema-types/documents/navigation";
import page from "./schema-types/documents/page";
import settings from "./schema-types/documents/settings";
import submissions from "./schema-types/documents/submissions";
import link from "./schema-types/objects/link";
import navItem from "./schema-types/objects/nav-item";
import articlesListing from "./schema-types/sections/articles-listing";
import contactForm from "./schema-types/sections/contact-form";
import cta from "./schema-types/sections/cta";
import portableText from "./schema-types/sections/formatted-text";
import hero from "./schema-types/sections/hero";
import textImage from "./schema-types/sections/text-image";
import { userSchemaTypes } from "./schema-types/user";

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
    cta,
    ...userSchemaTypes,
  ],
};
