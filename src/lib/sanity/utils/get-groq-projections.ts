import { groq } from "next-sanity";
import {
  articlesListingSectionProjection,
  contactSectionProjection,
  ctaSectionProjection,
  formattedTextSectionProjection,
  heroSectionProjection,
  textImageSectionProjection,
  translationsProjection,
} from "./projections";

export type ResourceType = "frontpage" | "page" | "article";

export function getGroqProjections(type: ResourceType) {
  if (type === "frontpage") {
    return groq`
    _type,
    _id,
    title,
    description,
    slug,
    content[] {
      ${[
        heroSectionProjection,
        ctaSectionProjection,
        textImageSectionProjection,
        formattedTextSectionProjection,
        articlesListingSectionProjection,
        contactSectionProjection,
      ].join(",")}
    },
    ${translationsProjection}
  `;
  }

  if (type === "page") {
    return groq`
      _type,
      _id,
      title,
      description,
      slug,
      isProtected,
      content[] {
        ${[
          heroSectionProjection,
          ctaSectionProjection,
          textImageSectionProjection,
          formattedTextSectionProjection,
          articlesListingSectionProjection,
          contactSectionProjection,
        ].join(",")}
      },
      ${translationsProjection}
    `;
  }

  if (type === "article") {
    return groq`
      ...
    `;
  }

  return "";
}
