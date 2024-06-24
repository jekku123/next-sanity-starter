import { groq } from "next-sanity";
import { ResourceType, getGroqProjections } from "./get-groq-projections";

export const getMenuQuery = groq`*[_type == "navigation" && slug.current == $slug && language == $locale][0] {
    _id,
    _type,
    title,
    language,
    items[] {
      _key,
      label,
      "href": coalesce(external, internal->slug.current, nextjsRoute),
      isProtected,
      subItems[] {
        _key,
        label,
        "href": coalesce(external, internal->slug.current, nextjsRoute),
      }
    }
  }`;

export const getSettingsQuery = groq`*[_type == "settings"][0] {
      _id,
      _type,
      title,
      description,
      logo,
    }`;

export const getSlugsByTypeAndLocaleQuery = groq`*[_type == $type && language == $locale] {
      slug {
        current
      }
    }`;

export const getMetadataQuery = groq`*[slug.current == $slug && language == $locale][0] {
      title,
      description,
    }`;

export const getResourceTypeBySlugQuery = groq`*[slug.current == $slug][0] {
      _type
    }`;

export const getFrontPageQuery = () => {
  const projections = getGroqProjections("frontpage");
  return groq`*[_type == "frontpage" && language == $locale][0] {${projections}}`;
};

export const getGroqQueryByResourceType = (type: ResourceType) => {
  const projections = getGroqProjections(type);
  return groq`*[slug.current == $slug && language == $locale][0] {${projections}}`;
};
