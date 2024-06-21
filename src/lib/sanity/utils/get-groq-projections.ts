import { groq } from "next-sanity";
import {
  contentBuilderProjection,
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
    ${contentBuilderProjection},
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
      ${contentBuilderProjection},
      ${translationsProjection}
    `;
  }

  if (type === "article") {
    return groq`
      _type,
      _id,
      title,
      description,
      image,
      tags,
      _createdAt,
      _updatedAt,
      body[],
      ${translationsProjection}
    `;
  }

  return "";
}
