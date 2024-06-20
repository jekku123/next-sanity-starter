import { groq } from "next-sanity";

export const heroSectionProjection = groq`_type == "hero" => {
    _type,
    _key,
    title,
    body[],
    image,
    primaryLink {
      ...,
      "internal": internal->slug.current,
    },
    secondaryLink {
      ...,
      "internal": internal->slug.current,
    }
  }`;

export const ctaSectionProjection = groq`_type == "cta" => {
    _type,
    _key,
    title,
    description,
    primaryLink {
      ...,
      "internal": internal->slug.current,
    },
    secondaryLink {
      ...,
      "internal": internal->slug.current,
    }
  }`;

export const textImageSectionProjection = groq`_type == "textImage" => {
    _type,
    _key,
    title,
    body[],
    image
  }`;

export const formattedTextSectionProjection = groq`_type == "formattedText" => {
    _type,
    _key,
    title,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset-> {
          ...,
          url,
          metadata {
            dimensions {
              ...,
              aspectRatio,
            },
          },
        },
      },
    },
  }`;

export const articlesListingSectionProjection = groq`_type == "articlesListing" => {
    _type,
    _key,
    title,
    limit
  }`;

export const contactSectionProjection = groq`_type == "contactSection" => {
    _type,
    _key,
    heading,
    body[]
  }`;

export const translationsProjection = groq`
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value-> {
    title,
    slug,
    language
  }`;
