import { groq } from "next-sanity";

export type ResourceType = "frontpage" | "page" | "article";

export default function getResourceGroqParams(type: ResourceType) {
  if (type === "frontpage") {
    return groq`
    ...,
    content[] {
      ...,
      _type == "hero" => {
        ...,
        primaryLink {
          ...,
          "internal": internal->slug.current,
          external,
        },
        secondaryLink {
          ...,
          "internal": internal->slug.current,
          external,
        }
      },
      _type == "cta" => {
        ...,
        primaryLink {
          ...,
          "internal": internal->slug.current,
          external,
        },
        secondaryLink {
          ...,
          "internal": internal->slug.current,
          external,
        },
      },
    }
  `;
  }

  if (type === "page") {
    return groq`
      ...,
      content[]{
        ...,
        _type == "cta" => {
          ...,
          primaryLink {
            ...,
            "internal": internal->slug.current,
            external,
          },
          secondaryLink {
            ...,
            "internal": internal->slug.current,
            external,
          },
        },
        _type == "formattedText" => {
          ...,
            ...,
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
        },
        _type == "hero" => {
          ...,
          primaryLink {
            ...,
            "internal": internal->slug.current,
            external,
          },
          secondaryLink {
            ...,
            "internal": internal->slug.current,
            external,
          },
        },
      }
    `;
  }

  if (type === "article") {
    return groq`
      ...,
      body[]
    `;
  }

  return "";
}
