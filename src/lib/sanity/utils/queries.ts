import { groq } from "next-sanity";

export const getMenuQuery = groq`*[_type == "navigation" && slug.current == $slug && language == $language][0] {
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

export const getSlugsByTypeAndLocaleQuery = groq`*[_type == $type && language == $language] {
      slug {
        current
      }
    }`;

export const getMetadataQuery = groq`*[slug.current == $slug && language == $language][0] {
      title,
      description,
    }`;

export const getResourceTypeBySlugQuery = groq`*[slug.current == $slug][0] {
      _type
    }`;

export const getFrontPageQuery = (projections: string) =>
  groq`*[_type == "frontpage" && language == $language][0] {${projections}}`;

export const getResourceBySlugLocaleAndProjectionsQuery = (
  projections: string,
) =>
  groq`*[slug.current == $slug && language == $language][0] {${projections}}`;
