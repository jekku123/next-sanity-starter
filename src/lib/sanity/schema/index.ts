import { type SchemaTypeDefinition } from "sanity";

import article from "./documents/article";
import frontpage from "./documents/frontpage";
import navigation from "./documents/navigation";
import page from "./documents/page";
import settings from "./documents/settings";
import submissions from "./documents/submissions";
import link from "./objects/link";
import navItem from "./objects/nav-item";
import articlesListing from "./sections/articles-listing";
import contactForm from "./sections/contact-form";
import cta from "./sections/cta";
import portableText from "./sections/formatted-text";
import hero from "./sections/hero";
import textImage from "./sections/text-image";
import { userSchemaTypes } from "./user";

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
